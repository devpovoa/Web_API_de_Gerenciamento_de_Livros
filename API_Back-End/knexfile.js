require("dotenv").config();

module.exports = {
  development: {
    client: "oracledb",
    connection: {
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_HOST + ":1521/" + process.env.ORACLE_DB
    },
    pool: { min: 1, max: 2 },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
