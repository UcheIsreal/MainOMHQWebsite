import { Pool } from "pg";
import crypto from "crypto";

// Reuse a single pool across hot reloads in dev and across warm serverless
// invocations in production, instead of opening a new one per request.
// SSL is intentionally NOT configured explicitly here: hosted providers
// (Neon, Vercel Postgres, Supabase, ...) put `sslmode=require` directly in
// the connection string they give you, and `pg` reads that on its own \u2014
// adding a separate explicit `ssl` option on top of that conflicts with it.
// A local Postgres connection string with no `sslmode` simply connects
// without SSL, which is what local development needs.
//
// connectionTimeoutMillis / statement_timeout matter more than they might
// look: without them, `pg` has no built-in cap, so a bad connection string,
// a firewalled port, or a database that can't be reached just hangs the
// request indefinitely instead of failing with a message that says what's
// wrong. 15s comfortably covers a cold start on a paused free-tier database
// (Neon/Vercel Postgres both suspend an idle database and wake it on the
// next connection, which can take a few seconds) while still failing fast
// enough to be diagnosable when something is actually misconfigured.
//
// The pool is built lazily, inside getPool(), rather than at module scope.
// Next.js imports every route's module during the build's "collect page
// data" step \u2014 including force-dynamic routes like this project's pages
// \u2014 just to inspect them, without ever calling their data-fetching code.
// If reading DATABASE_URL or constructing the Pool happened at module
// scope, a missing env var (e.g. before a database is attached on Vercel)
// would throw during that import and fail the build itself, even though
// no page actually needed a live connection yet. Deferring both into a
// function that only runs when a query is actually awaited means a missing
// or bad connection string surfaces as a clear error on the specific
// request that needed the database, and the build succeeds regardless.
const globalForDb = globalThis;

function getPool() {
  if (!globalForDb.__omhqPool) {
    // Vercel Postgres / marketplace integrations sometimes inject
    // POSTGRES_URL instead of DATABASE_URL \u2014 accepting either means
    // connecting a database in the Vercel dashboard just works, with
    // nothing to rename.
    const connectionString =
      process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (!connectionString) {
      throw new Error(
        "No database connection string found. Add DATABASE_URL to .env (see README \u00a7 1), " +
          "or connect a Postgres database to this project on Vercel, which sets one automatically."
      );
    }

    globalForDb.__omhqPool = new Pool({
      connectionString,
      connectionTimeoutMillis: 15000,
      statement_timeout: 15000,
    });
  }
  return globalForDb.__omhqPool;
}

// Table creation is idempotent (IF NOT EXISTS), so once it succeeds for
// this warm process, every query below just awaits the same cached
// promise instead of re-checking on every call. If it FAILS (e.g. a
// transient network blip on cold start), the failed attempt is discarded
// rather than cached, so the next call tries again instead of that warm
// instance being stuck permanently broken.
function createSchema() {
  return getPool().query(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      cover_image_url TEXT,
      published BOOLEAN NOT NULL DEFAULT FALSE,
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL
    );
  `);
}

async function ready() {
  if (!globalForDb.__omhqSchemaReady) {
    globalForDb.__omhqSchemaReady = createSchema();
  }
  try {
    await globalForDb.__omhqSchemaReady;
  } catch (err) {
    globalForDb.__omhqSchemaReady = null;
    if (
      err.code === "ENOTFOUND" ||
      err.code === "ETIMEDOUT" ||
      /timeout/i.test(err.message)
    ) {
      const detail = err.code ? ` (${err.code})` : "";
      throw new Error(
        `Couldn't reach the database at the host in DATABASE_URL${detail}. ` +
          "Check .env still has your real Neon/Vercel Postgres connection string, not the placeholder \u2014 and if it's a Neon free-tier database that's been idle, the first connection can take a few seconds to wake it.",
        { cause: err }
      );
    }
    throw err;
  }
}

function rowToPost(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImageUrl: row.cover_image_url,
    published: row.published,
    publishedAt: row.published_at ? row.published_at.toISOString() : null,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function uniqueSlug(title, excludeId) {
  await ready();
  const base = slugify(title) || "post";
  let candidate = base;
  let n = 2;
  while (true) {
    const { rows } = await getPool().query(
      "SELECT id FROM posts WHERE slug = $1",
      [candidate]
    );
    const existing = rows[0];
    if (!existing || existing.id === excludeId) return candidate;
    candidate = `${base}-${n}`;
    n += 1;
  }
}

export async function getAllPosts() {
  await ready();
  const { rows } = await getPool().query(
    "SELECT * FROM posts ORDER BY created_at DESC"
  );
  return rows.map(rowToPost);
}

export async function getPublishedPosts() {
  await ready();
  const { rows } = await getPool().query(
    "SELECT * FROM posts WHERE published = TRUE ORDER BY published_at DESC"
  );
  return rows.map(rowToPost);
}

export async function getPostBySlug(slug) {
  await ready();
  const { rows } = await getPool().query("SELECT * FROM posts WHERE slug = $1", [
    slug,
  ]);
  return rowToPost(rows[0]);
}

export async function getPostById(id) {
  await ready();
  const { rows } = await getPool().query("SELECT * FROM posts WHERE id = $1", [
    id,
  ]);
  return rowToPost(rows[0]);
}

export async function createPost({
  title,
  slug,
  excerpt,
  content,
  coverImageUrl,
  published,
}) {
  await ready();
  const id = crypto.randomUUID();
  const now = new Date();
  await getPool().query(
    `INSERT INTO posts
       (id, title, slug, excerpt, content, cover_image_url, published, published_at, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      id,
      title,
      slug,
      excerpt,
      content,
      coverImageUrl || null,
      Boolean(published),
      published ? now : null,
      now,
      now,
    ]
  );
  return getPostById(id);
}

export async function updatePost(
  id,
  { title, slug, excerpt, content, coverImageUrl, published }
) {
  await ready();
  const existing = await getPostById(id);
  if (!existing) return null;
  const now = new Date();
  const publishedAt = published
    ? existing.publishedAt || now.toISOString()
    : null;
  await getPool().query(
    `UPDATE posts SET
       title = $2,
       slug = $3,
       excerpt = $4,
       content = $5,
       cover_image_url = $6,
       published = $7,
       published_at = $8,
       updated_at = $9
     WHERE id = $1`,
    [
      id,
      title,
      slug,
      excerpt,
      content,
      coverImageUrl || null,
      Boolean(published),
      publishedAt,
      now,
    ]
  );
  return getPostById(id);
}

export async function deletePost(id) {
  await ready();
  await getPool().query("DELETE FROM posts WHERE id = $1", [id]);
}
