const Sequelize = require('sequelize');
const { Connector } = require('@google-cloud/cloud-sql-connector');

// module.exports = new Sequelize('todo-development', 'todo-development', 'todo-development', {
//  host: 'todo-db',
//  dialect: 'mysql', // Change to your database type
// });

// For production environment
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dialect = process.env.DB_DIALECT;
const connection = process.env.DB_CONNECTION;
const cCert = process.env.CCERT;
const cKey = process.env.CKEY;  
const cCa = process.env.CCA; 

const connector = new Connector();
const clientOpts = connector.getOptions({
    instanceConnectionName: connection,
    authType: "IAM",
  });

module.exports = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ...clientOpts,
        ssl: {
            ca: Buffer.from(cCa, 'base64').toString(),
            cert: Buffer.from(cCert, 'base64').toString(),
            key: Buffer.from(cKey, 'base64').toString()
        },
        // socketPath: `/cloudsql/${connection}`,

    }
   });