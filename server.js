const express = require('express')
const db = require('./config/db')
const cors = require('cors')
const app = express()

const port = 3001

const userRouter = require('./app/routes/user')

app.use(cors())
app.use(express.json())
app.use(userRouter)


app.listen(port, () => {
    console.log('La aplicación está funcionando');
})

db.connect()