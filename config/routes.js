const express = require('express')
const router = express.Router()
const codeSnippetCltr = require('../app/controllers/codeSnippetCltr')
const answerCtrl = require('../app/controllers/answerCtrl')

router.get('/', (req, res) => {
    res.send('welcome to the code builder api')
})

router.get('/api/code-snippets', codeSnippetCltr.list)
router.post('/api/code-snippets', codeSnippetCltr.create)
router.get('/api/code-snippets/:id', codeSnippetCltr.read)
router.put('/api/code-snippets/:id', codeSnippetCltr.update)
router.delete('/api/code-snippets/:id', codeSnippetCltr.destroy)

router.post('/api/code-snippets/:id/snippets', codeSnippetCltr.postSnippet)
router.put('/api/code-snippets/:id/snippets/:sid', codeSnippetCltr.updateSnippet)
router.delete('/api/code-snippets/:id/snippets/:sid', codeSnippetCltr.removeSnippet)

router.get('/api/answers', answerCtrl.list)
router.post('/api/answers', answerCtrl.create)
router.get('/api/answers/:id', answerCtrl.read)
router.put('/api/answers/:id', answerCtrl.update)
router.delete('/api/answers/:id', answerCtrl.destroy)

router.get('/api/answers/codes/:cid', answerCtrl.getStudents)
router.get('/api/answers/students/:sid', answerCtrl.getScore)
router.get('/api/answers/codes/:cid/students/:sid', answerCtrl.getStudent)

module.exports = router