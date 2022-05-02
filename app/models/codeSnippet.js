const mongoose = require('mongoose')
const Schema = mongoose.Schema

const codeSnippetSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    statement: {
        type: String,
        required: [true, 'code-snippet should have a question statement']
    },
    snippets: [
        {
            value: {
                type: String
            },
            group: {
                type: String,
                required: [true, 'group is required'],
                enum: ['input', 'texts', 'break', 'tab', 'doubleTab', 'space', 'submit', 'control']
            },
            hint: {
                type: String
            },
            hints: [
                {
                    hint: String,
                    hint_id: String
                }
            ],
            limit: {
                type: String
            },
            answer: {
                type: String
            },
            id: {
                type: Number
            },
            explanation: {
                type: String
            },
            displayOrder: {
                type: Number
            }
        }
    ]
    
})
const CodeSnippet = mongoose.model('CodeSnippetSchema', codeSnippetSchema)
module.exports = CodeSnippet