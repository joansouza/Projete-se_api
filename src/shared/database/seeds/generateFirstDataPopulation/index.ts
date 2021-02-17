import { Connection } from 'typeorm';
import migrateUsers from './migrateUsers';

async function generateFirstDataPopulation(connection: Connection) {
  await connection.transaction(async (transaction) => {
    const users = await migrateUsers(transaction);

    return users;
  });
}

export default generateFirstDataPopulation;
