require("dotenv").config();
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    database: process.env.DB_LOCAL_DBNAME || "instockmp2",
    user: process.env.DB_LOCAL_USER || "root",
    password: process.env.DB_LOCAL_PASSWORD || "",
    charset: "utf8",
  },
};


// run [npx knex migrate:latest] to load tables after creating the instockmp2 database.
// run [npx knex seed: run] to load seeds to database.