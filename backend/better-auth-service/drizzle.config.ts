import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    host: process.env.DB_HOST || "auth-db",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "authdb",
    user: process.env.DB_USER || "smartcity",
    password: process.env.DB_PASSWORD || "smartcity",
    ssl: false,
  },
});
