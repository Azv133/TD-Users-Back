const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: JSON.parse(process.env.DB_SSL),
});

module.exports = {
    connect: async () => {
        try {
            const conn = await pool.getConnection();
            console.log('Conexión exitosa a la base de datos');
            pool.releaseConnection(conn);
            return pool;
        } catch (err) {
            console.error('Error al conectar a la base de datos:', err);
            throw err;
        }
    },

    disconnect: async () => {
        try {
            await pool.end();
            console.log('Conexión cerrada');
        } catch (err) {
            console.error('Error al cerrar la conexión:', err);
            throw err;
        }
    },

    query: async (queryString) => {
        try {
            const conn = await pool.getConnection();
            const [rows, fields] = await conn.query(queryString);
            conn.release();
            return rows;
        } catch (err) {
            console.error('Error en la consulta:', err);
            throw err;
        }
    },
};
