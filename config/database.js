const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-builder'
const configureDB = () => {
    mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log('err in connecting to db')
        })
}

module.exports = configureDB

// const mongoose = require('mongoose')

// const configureDB = ()=>{
//     mongoose.connect('mongodb://localhost:27017/dec15-2021')
//         .then(()=>{
//             console.log('connected to db')
//         })
//         .catch((err)=>{
//             console.log('err in connecting to db')
//         })
// }

// module.exports = configureDB