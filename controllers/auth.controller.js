const authModel = require('../models/auth.model')




exports.getregisterpage = (req, res, next) => {
    res.render('register')
}

exports.postregisterdata = (req, res, next) => {
    authModel.registerfunctionmodel(req.body.name, req.body.email, req.body.password).then((user) => {
        res.render('/login',{verifuser:req.session.userId})
    }).catch((msg) => {
        console.log(msg)
    })

}

exports.getloginpage = (req, res, next) => {
    res.render('login',{verifuser:req.session.userId})
}


exports.postlogindata = (req, res, next) => {
    authModel.loginfunctionmodel(req.body.email, req.body.password).then((id) => {
        req.session.userId = id
        res.redirect('/',{verifuser:req.session.userId})
    }).catch((err) => {
        console.log(err)
    })
}
exports.logoutfunc = (rec, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login',{verifuser:req.session.userId})
    })
}