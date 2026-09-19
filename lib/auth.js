import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "omhq_admin_session";
const SESSION_DURATION = "7d";

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set in the environment.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(email) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch {
    return null;
  }
}

export function verifyCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminHash = process.env.ADMIN_PASSWORD_HASH || "";
  if (!email || !password) return false;
  if (email.toLowerCase() !== adminEmail.toLowerCase()) return false;
  return bcrypt.compareSync(password, adminHash);
}

// Server-side helper for use in Server Components / Server Actions.
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
