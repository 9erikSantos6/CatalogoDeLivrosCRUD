const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: 'biblioteca_crud',
    port: 3306
});
connection.connect((error) => {
    if (error) {
       console.error(`Erro durante a conexão com o banco: ${error}`);
       return;
    }
    console.log('> Conectado a o banco de dados!');
});

module.exports = connection;
