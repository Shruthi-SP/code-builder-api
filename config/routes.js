const express = require('express')
const router = express.Router()
const codeSnippetCltr = require('../app/controllers/codeSnippetCltr')
const answerCtrl = require('../app/controllers/answerCtrl')
const usersCtrl = require('../app/controllers/usersCtlr')

router.get('/', (req, res) => {
    res.send('welcome to the code builder api')
})

router.post('/login', usersCtrl.login)

router.get('/code-snippets', codeSnippetCltr.list)
router.post('/code-snippets', codeSnippetCltr.create)
router.get('/code-snippets/:id', codeSnippetCltr.read)
router.put('/code-snippets/:id', codeSnippetCltr.update)
router.delete('/code-snippets/:id', codeSnippetCltr.destroy)

router.post('/code-snippets/:id/snippets', codeSnippetCltr.postSnippet)
router.put('/code-snippets/:id/snippets/:sid', codeSnippetCltr.updateSnippet)
router.delete('/code-snippets/:id/snippets/:sid', codeSnippetCltr.removeSnippet)

router.get('/answers', answerCtrl.list)
router.post('/answers', answerCtrl.create)
router.get('/answers/:id', answerCtrl.read)
router.put('/answers/:id', answerCtrl.update)
router.delete('/answers/:id', answerCtrl.destroy)

router.get('/answers/codes/:cid', answerCtrl.getStudents)
router.get('/answers/students/:sid', answerCtrl.getScore)
router.get('/answers/codes/:cid/students/:sid', answerCtrl.getStudent)

module.exports = router