const express = require('express')
const cors = require('cors')
const configureDB = require('./config/database')
const router = require('./config/routes')

const app = express()
const port = 3044

configureDB()
app.use(cors()) 
app.use(express.json())
app.use(router)

app.listen(port, ()=>{
    console.log('server running on port', port)
})