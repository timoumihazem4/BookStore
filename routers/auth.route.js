const route = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const body = require('express').urlencoded({ extended: true })
const GuardAuth=require('../guardAuth')



route.get('/register',GuardAuth.isAuth, AuthController.getregisterpage)
route.post('/register', body, AuthController.postregisterdata)
route.get('/login',GuardAuth.isAuth, AuthController.getloginpage)
route.post('/login', body, AuthController.loginfunctionmodel)
route.post('/logout',GuardAuth.isAuth, AuthController.logoutfunc)



module.exports = route