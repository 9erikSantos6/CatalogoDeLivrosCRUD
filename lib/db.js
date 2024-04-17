const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: 'biblioteca_crud'
});

connection.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('> Conectado a o banco de dados!')
});


module.exports = connection;