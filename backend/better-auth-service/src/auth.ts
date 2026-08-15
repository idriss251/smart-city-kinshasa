import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db/schema.js";

const pool = new Pool({
  host: process.env.DB_HOST || "auth-db",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "authdb",
  user: process.env.DB_USER || "smartcity",
  password: process.env.DB_PASSWORD || "smartcity",
  ssl: false,
});

const db = drizzle({ client: pool, schema });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  secret: process.env.BETTER_AUTH_SECRET || "change-me-in-production",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:18080",
  trustedOrigins: (process.env.BETTER_AUTH_TRUSTED_ORIGINS || "http://localhost:13000").split(","),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
    resetPasswordTokenExpiresIn: 3600,
    sendResetPassword: async ({ user, url, token }) => {
      console.log(`[RESET PASSWORD] user=${user.email} token=${token} url=${url}`);
    },
  },
});
