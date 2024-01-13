const db = require('../../config/db');

exports.getUsers = async (req, res) => {
    const query = 'SELECT * FROM Users';

    try {
        const result = await db.query(query); 
        res.send({ users: result });
    } catch (err) {
        console.error('Error en la aplicación:', err);
        res.status(500).send({ error: 'Error en la aplicación' });
    }
};

exports.addUser = async (req, res) => {
    console.log(req.body);
    const { UserName, Email, DateOfBirth } = req.body;

    const query = `INSERT INTO Users (UserName, Email, DateOfBirth, CreatedAt) VALUES ('${UserName}', '${Email}', '${DateOfBirth}', NOW())`; // Se cambia GETDATE() por NOW()

    try {
        const result = await db.query( query);
        res.send({ message: 'Usuario agregado correctamente' });
    } catch (err) {
        console.error('Error al agregar usuario:', err);
        res.status(500).send({ error: 'Error al agregar usuario' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { UserName, Email, DateOfBirth } = req.body;

    const query = `UPDATE Users SET UserName='${UserName}', Email='${Email}', DateOfBirth='${DateOfBirth}' WHERE UserID=${userId}`;

    try {
        await db.query(query);
        res.send({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).send({ error: 'Error al actualizar usuario' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    const query = `DELETE FROM Users WHERE UserID=${userId}`;

    try {
        await db.query(query);
        res.send({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).send({ error: 'Error al eliminar usuario' });
    }
};
