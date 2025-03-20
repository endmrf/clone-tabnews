import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  if (!["GET", "POST"].includes(request.method)) {
    return response.status(405).end();
  }

  const dryRun = request.method === "GET";

  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: dryRun,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });

  if (migrations.length > 0) {
    return response.status(201).json(migrations);
  }

  return response.status(200).json(migrations);
}
