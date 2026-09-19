// Generates a bcrypt hash for the admin dashboard password.
//
// Usage:
//   node scripts/hash-password.js "your-new-password"
//
// Copy the printed hash into .env as ADMIN_PASSWORD_HASH.
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.js \"your-password\"");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

// bcrypt hashes look like $2b$10$..., and Next.js expands $word inside
// .env values as if it were a shell variable. Escaping the $ as \$ stops
// that expansion so the hash is stored (and read back) correctly.
const escapedForEnvFile = hash.replace(/\$/g, "\\$");

console.log("\nAdd this to your .env file exactly as shown (the backslashes matter):\n");
console.log(`ADMIN_PASSWORD_HASH="${escapedForEnvFile}"\n`);
