import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

async function createTestConnection() {
  const connectionName = 'test';
  let databaseName: string | Uint8Array | undefined;

  beforeAll?.(async () => {
    const connectionOptions = await getConnectionOptions(connectionName);
    if (connectionOptions.name !== connectionName) {
      throw new Error(
        `typeorm connection options with name "${connectionName}" could not be found`
      );
    }
    if (
      typeof connectionOptions.database === 'string' &&
      connectionOptions.database?.includes(connectionName)
    ) {
      databaseName = connectionOptions.database;
    } else {
      throw new Error(
        `Test database name must have "${connectionName}" in its name`
      );
    }
    await createConnection({ ...connectionOptions, name: 'default' });
  });

  afterAll?.(async () => {
    const connection = getConnection();

    await connection?.close();
  });

  afterEach(async () => {
    const connection = getConnection();

    if (connection.options.database === databaseName) {
      const entities = connection.entityMetadatas;

      for (const entity of entities) {
        const tableName = entity.tableName;
        const keepTables = ['Country', 'Region', 'State', 'City', 'District'];

        if (!keepTables.some((e) => e === tableName)) {
          const repository = connection.getRepository(entity.name);

          await repository.query(`DELETE FROM "${tableName}"`).catch(() => {
            //
          });
        }
      }
    }
  });
}

export default createTestConnection;
