const Sequelize = require('sequelize');
module.exports = new Sequelize('todo-development', 'todo-development', 'todo-development', {
 host: 'todo-db',
 dialect: 'mysql', // Change to your database type
});