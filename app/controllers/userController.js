const db = require('../../config/db');

exports.getUsers = async(req, res) => {
    const query = 'SELECT * FROM Users'

    try{
        const result = await db.query('SELECT * FROM Users');
        res.send({ users: result }) 
    }catch (err) {
        console.error('Error en la aplicación:', err);
    } 
}