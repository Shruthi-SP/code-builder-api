const CodeSnippet = require('../models/codeSnippet')

const codeSnippetCltr = {}

codeSnippetCltr.list = (req, res) => {
    CodeSnippet.find()
        .then((codes) => {
            res.json(codes)
        })
        .catch((err) => {
            res.json(err)
        })
}
codeSnippetCltr.create = (req, res) => {
    const body = req.body
    const code = new CodeSnippet(body)
    code.save()
        .then((code) => {
            res.json(code)
        })
        .catch((err) => {
            res.json(err)
        })
}
codeSnippetCltr.read = (req, res) => {
    const id = req.params.id
    const body = req.body
    CodeSnippet.findById(id)
        .then(code => {
            res.json(code)
        })
        .catch(err => {
            res.json(err)
        })
}
codeSnippetCltr.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    CodeSnippet.findByIdAndUpdate(id, body, { new: true })
        .then(code => {
            //console.log('updated data=', code)
            res.json(code)
        })
        .catch(err => {
            res.json(err)
        })
}
codeSnippetCltr.destroy = (req, res) => {
    const id = req.params.id
    //console.log('id=',id)
    CodeSnippet.findByIdAndDelete(id)
        .then(code => {
            res.json(code)
        })
        .catch(err => {
            //console.log(err)
            res.json(err)
        })
}
codeSnippetCltr.postSnippet = (req, res) => {
    const id = req.params.id
    const body = req.body
    //console.log(id, body)
    CodeSnippet.findByIdAndUpdate(id, { $push: { snippets: body } }, { new: true })
        .then(code => {
            res.json(code)
        })
        .catch(err => {
            res.json(err)
        })
}
codeSnippetCltr.updateSnippet = (req, res) => {
    const id = req.params.id
    const sid = req.params.sid
    const body = req.body
    //console.log(id, sid, body)
    CodeSnippet.findById(id)
        .then((codeSnippet) => {
            if(codeSnippet) {
                const snippet = codeSnippet.snippets.find(sn => sn._id.equals(sid))
                //console.log('s', snippet)
                Object.assign(snippet, body) 
             
                codeSnippet.save()
                    .then((cs) => {
                        res.json(cs)
                    })
                    .catch(err => res.json(err))
            } else {
                res.json({ notice: 'code snippet not found'})
            }
        })
        .catch(err => res.json(err))
}

codeSnippetCltr.removeSnippet = (req, res) => {
    const id = req.params.id
    const sid = req.params.sid
    //console.log('remove snippet', id, sid)
    // CodeSnippet.findById(id).
    // then((cs) => {
        CodeSnippet.findByIdAndUpdate({_id: id}, {$pull: {snippets: {_id: sid} }}, {new: true})
        .then(result => {
            res.json(result)
        })
        .catch(err => res.json(err))
    //}).catch(err => res.json(err))

    // CodeSnippet.findById(id)
    //     .then(cs=>{
    //         const snippets = cs.snippets.filter(ele=>ele.id!==sid)
    //         cs.snippets=snippets
    //         cs.save()
    //             .then(code=>{
    //                 res.json(code)
    //             })
    //             .catch(er=>{
    //                 res.json(er)
    //             })
    //     })
    //     .catch(err=>{
    //         res.json(err)
    //     })
}


module.exports = codeSnippetCltr
