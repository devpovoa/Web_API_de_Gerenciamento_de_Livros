module.exports = {
  development: {
    client: 'oracledb',
    connection: {
      user: 'SYSTEM',
      password: '86900821',
      connectString: 'localhost:1521/XE'
    },
    pool: { min: 1, max: 2 },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
