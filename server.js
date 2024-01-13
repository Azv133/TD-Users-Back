const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3001;

const userRouter = require('./app/routes/user');

app.use(cors());
app.use(express.json());
app.use(userRouter);

(async () => {
    try {
        await db.connect();
        console.log('Conexión a la base de datos establecida');
        
        app.listen(port, () => {
            console.log('La aplicación está funcionando');
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

process.on('SIGINT', async () => {
    try {
        await db.disconnect();
        console.log('Conexión a la base de datos cerrada');
        process.exit();
    } catch (error) {
        console.error('Error al cerrar la conexión a la base de datos:', error);
        process.exit(1);
    }
});
