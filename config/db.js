const sql = require('mssql');

const config = {
    user: 'adrian',
    password: '987654321',
    server: 'localhost',
    database: 'Users',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

module.exports = {
    connect: async () => {
        try {
            await sql.connect(config);
            console.log('Conexión exitosa a la base de datos');
        } catch (err) {
            console.error('Error al conectar a la base de datos:', err);
            throw err;
        }
    },

    disconnect: () => {
        sql.close();
        console.log('Conexión cerrada');
    },

    query: async (queryString) => {
        try {
            const result = await sql.query(queryString);
            return result.recordset;
        } catch (err) {
            console.error('Error en la consulta:', err);
            throw err; // Propagar el error para que pueda ser manejado por la aplicación que importa este módulo
        }
    },
};
