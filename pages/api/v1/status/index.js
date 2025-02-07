import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  const resultVersion = await database.query("SHOW server_version;");
  const resultMaxConnections = await database.query("SHOW max_connections");
  const resultOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const version = resultVersion.rows[0].server_version;
  const maxConnections = parseInt(resultMaxConnections.rows[0].max_connections);
  const openedConnections = resultOpenedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: maxConnections,
        opened_connections: openedConnections,
        version: version,
      },
    },
  });
}

export default status;
