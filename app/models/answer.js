const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    codeId: {
        type: Schema.Types.ObjectId,
        ref: 'CodeSnippet',
        required: [true, 'Code Id is required']
    },
    studentId: {
        type: String,
        required: [true, 'Student id is required']
    },
    answers: [
        {
            snipId: {
                type: String,
                required:[true, 'Snippet Id is required']
            },
            snipAnswer: {
                type: String
            }
        }
    ],
    score: {
        type: String,
        required:[true, 'scores are required']
    }
},{ timestamps: true })
const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer