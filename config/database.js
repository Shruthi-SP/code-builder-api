const mongoose = require('mongoose')

const configureDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/dec15-2021')
        .then(()=>{
            console.log('connected to db')
        })
        .catch((err)=>{
            console.log('err in connecting to db')
        })
}

module.exports = configureDB