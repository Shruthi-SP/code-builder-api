const express = require('express')
const cors = require('cors')
const configureDB = require('./config/database')
const router = require('./config/routes')

const app = express()
const port = process.env.PORT || 3044
const path = require('path')

configureDB()
app.use(cors()) 
app.use(express.json())
app.use("/api",router)
app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

app.listen(port, ()=>{
    console.log('server running on port', port)
})