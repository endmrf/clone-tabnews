test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  responseBody = await response.json();
  databaseInfo = responseBody.dependencies.database;

  expect(databaseInfo.version).toBeDefined();
  expect(databaseInfo.max_connections).toBeGreaterThanOrEqual(0);
  expect(databaseInfo.opened_connections).toEqual(1);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  const parsedMaxConnections = parseInt(databaseInfo.max_connections);
  const parsedOpenedConnections = parseInt(databaseInfo.opened_connections);

  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(databaseInfo.max_connections).toEqual(parsedMaxConnections);
  expect(databaseInfo.opened_connections).toEqual(parsedOpenedConnections);
});
