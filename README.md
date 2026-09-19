# Online Marketing HQ \u2014 website

Four pages \u2014 Home, Services, Work, Blog \u2014 plus a password-protected
dashboard at `/admin` for publishing blog posts. Built with Next.js (App
Router), Tailwind CSS v4, and a hosted Postgres database for blog content
(works identically in local dev and in production, including on Vercel).

## 1. Get a Postgres database

The app needs a `DATABASE_URL` before it will run \u2014 there's no local file
fallback. Pick either of these (both have a free tier that's plenty for a
site like this):

**Neon** (neon.tech):
1. Sign up and create a project.
2. On the project dashboard, find the **Connection string** box and copy
   it \u2014 make sure the **pooled** variant is selected if there's a toggle
   (better suited to a serverless host like Vercel).

**Vercel Postgres:**
1. In your Vercel dashboard: **Storage tab → Create Database → Postgres.**
2. Vercel creates several environment variables for you (`POSTGRES_URL`,
   `POSTGRES_URL_NON_POOLING`, etc.) rather than one named `DATABASE_URL`.
   This project's code specifically looks for `DATABASE_URL`, so either
   rename the pooled one to `DATABASE_URL` in **Settings → Environment
   Variables**, or copy its value into a new `DATABASE_URL` variable.

Either way, put the resulting connection string in `.env`:

```
DATABASE_URL="postgres://USER:PASSWORD@HOST/DBNAME?sslmode=require"
```

## 2. Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The first request creates the `posts` table
automatically if it doesn't exist yet \u2014 no separate migration step. To use
the dashboard, go to http://localhost:3000/admin/login.

**Demo login (change this before you publish anything real \u2014 see \u00a74):**

- Email: `admin@onlinemarketinghq.co`
- Password: `OmhqDemo123!`

## 3. How the blog works

Every blog post \u2014 title, excerpt, cover image URL, content, published/draft
status \u2014 lives in that Postgres database, in a single `posts` table.
`/admin/dashboard` lists posts; `/admin/dashboard/new` and
`/admin/dashboard/edit/[id]` create and edit them. Content is written in
**Markdown** (`## heading`, `**bold**`, `- list item`) and rendered on the
public post page.

A post only appears on `/blog` and on the homepage's "From the blog" section
once its "Published" checkbox is on. Unpublished posts are drafts, visible
only in the dashboard.

Because it's a real hosted database rather than a file on disk, this works
the same way whether you're running it locally, on a persistent-disk host,
or on Vercel \u2014 publishing through the dashboard actually sticks.

## 4. Changing the admin password

```bash
node scripts/hash-password.js "your-new-password"
```

This prints a line like:

```
ADMIN_PASSWORD_HASH="\$2b\$10\$..."
```

Copy that **exactly, including the backslashes**, into `.env`, replacing the
existing `ADMIN_PASSWORD_HASH` line. (Bcrypt hashes start with `$2b$10$...`,
and Next.js treats a bare `$word` in a `.env` file as a variable reference \u2014
the backslashes stop that from happening. The script handles this for you;
just don't retype the hash by hand.)

You can also change the login email by editing `ADMIN_EMAIL` in `.env`.

`SESSION_SECRET` in `.env` signs the login session cookie. It's already set
to a random value \u2014 you don't need to touch it unless you want to invalidate
all existing sessions.

## 5. Editing content

- **Services page** (`app/(site)/services/page.js`) \u2014 the three service
  blocks (Ads Management, SEO, Ecommerce Builds) and what's included in each.
- **Work page** (`app/(site)/work/page.js`) \u2014 **the six case studies here
  are placeholders with made-up numbers**, clearly marked in a comment at the
  top of the file. Replace them with real client results (with permission to
  share the numbers) before this page goes live.
- **Home page** (`app/(site)/page.js`) \u2014 the "What we report on" stats in
  the hero are also sample figures \u2014 same rule applies.
- **Colors, fonts, spacing** \u2014 the brand tokens (dark background, red
  accent, cyan/lime/gold gradient) live in `app/globals.css` under `@theme`.
  Fonts (Manrope + Inter) are self-hosted in `app/fonts/`.
- **Favicon** \u2014 `app/favicon.ico` is still the default Next.js icon; swap
  in an OMHQ one when you have it.

## 6. Deploying

This app needs a Node.js server (not a static export), because the blog
dashboard reads and writes to the database at request time. It deploys
cleanly to Vercel, or to any other Node host (a VPS, Railway, Render,
Fly.io) \u2014 the database being a separate hosted Postgres instance rather
than a local file means there's no platform-specific caveat here anymore.

Wherever you deploy, set four environment variables in your host's
dashboard \u2014 the same four from `.env`: `DATABASE_URL`, `ADMIN_EMAIL`,
`ADMIN_PASSWORD_HASH`, and `SESSION_SECRET`. Generate your own real values
first (\u00a71 and \u00a74) \u2014 don't reuse the demo ones. If you created the database
through Vercel's Storage tab directly on the project you're deploying,
Vercel injects its own connection env vars automatically \u2014 see \u00a71 for the
naming caveat there.

## 7. Project structure

```
app/
  (site)/           Public pages \u2014 home, services, work, blog (shares navbar/footer)
  admin/
    login/          Login page
    dashboard/      Post list, new post, edit post (protected)
  fonts/            Self-hosted Manrope & Inter
  globals.css       Design tokens + shared component classes
components/
  admin/            Login form, post form, delete button (client components)
lib/
  db.js             All blog post storage (Postgres via `pg`) \u2014 the file to change for a different database
  auth.js           Session cookie signing/verification, password checking
  actions/          Server actions for login, logout, and post CRUD
proxy.js            Protects /admin/* routes (redirects to /admin/login if not signed in)
scripts/
  hash-password.js  Generates a correctly-escaped ADMIN_PASSWORD_HASH
```
