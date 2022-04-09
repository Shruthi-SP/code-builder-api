const Answer = require('../models/answer')

const answerCtrl = {}

answerCtrl.list = (req, res) => {
    Answer.find()
        .then(array => {
            res.json(array)
        })
        .catch(err => {
            res.json(err)
        })
}
answerCtrl.create = (req, res) => {
    const body = req.body
    const answer = new Answer(body)
    answer.save()
        .then((obj) => {
            res.json(obj)
        })
        .catch((err) => {
            res.json(err)
        })
}
answerCtrl.read = (req, res) => {
    const id = req.params.id
    Answer.findById(id)
        .then(obj => {
            res.json(obj)
        })
        .catch(err => {
            res.json(err)
        })
}
answerCtrl.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    //console.log('update', id, body)
    Answer.findByIdAndUpdate(id, body, { new: true })
        .then(obj => {
            res.json(obj)
        })
        .catch(err => {
            res.json(err)
        })
}
answerCtrl.destroy = (req, res) => {
    const id = req.params.id
    //console.log('id=', id)
    Answer.findByIdAndDelete(id)
        .then(obj => {
            res.json(obj)
        })
        .catch(err => {
            //console.log(err)
            res.json(err)
        })
}

answerCtrl.getScore = (req, res) => {
    const sid = req.params.sid
    Answer.find({ studentId: sid })
        .then((answers) => {
            const totalQuestions = answers.length
            let totalPoints = 0
            let obtainedPoints = 0
            answers.forEach(ele => {
                totalPoints += Number(ele.score[8])
                obtainedPoints += Number(ele.score[6])
            })
            res.json({ allAnswers: answers, totalQuestions: totalQuestions, totalPoints: totalPoints, obtainedPoints: obtainedPoints })
        })
        .catch((err) => {
            //console.log(err)
            res.json(err)
        })
}
answerCtrl.getStudent = (req, res) => {
    const cid = req.params.cid
    const sid = req.params.sid
    Answer.find({ codeId: cid, studentId: sid })
        .then((answers) => {
            //console.log(answers)
            res.json(answers)
        })
        .catch((err) => {
            //console.log(err)
            res.json(err)
        })
}
answerCtrl.getStudents = (req, res) => {
    const cid = req.params.cid
    Answer.find({ codeId: cid })
        .then((answers) => {
            res.json(answers)
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports = answerCtrl