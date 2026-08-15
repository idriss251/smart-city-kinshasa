import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";

const app = express();
const PORT = process.env.PORT || 8089;

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.all("/api/betterauth/*", toNodeHandler(auth));

app.listen(PORT, () => {
  console.log(`Better Auth service listening on port ${PORT}`);
});
