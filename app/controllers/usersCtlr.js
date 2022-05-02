const axios = require("axios")
const jwt = require("jsonwebtoken")

const usersCtrl = {}
usersCtrl.login = (req, res) => {
    const body = req.body
    //res.send({name: body.user_name, role: body.role})
    const tokenData = { id: body.id, user_name: body.user_name, email: body.email, role: body.role, account_type: body.account_type}
    const token = jwt.sign(tokenData, 'dct', { expiresIn: '10h' })
    res.send(token)
}
module.exports = usersCtrl