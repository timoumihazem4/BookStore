const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { resolve } = require('path')


var schemaAuth = mongoose.Schema({

    name: String,
    email: String,
    password: String,

})


var User = mongoose.model('user', schemaAuth)
var url = 'mongodb://localhost:27017/Library'
exports.registerfunctionmodel = (name, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (user) {
                mongoose.disconnect()
                reject('email is used')
            }
            else { return bcrypt.hash(password, 7) }
        }).then((hpassword) => {
            let user = new User({
                name: name,
                email: email,
                password: hpassword

            })

            return user.save()

        }).then((user) => {
            mongoose.disconnect()
            resolve('registered !')

        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })


    })
}

exports.loginfunctionmodel = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return user.findOne({ email: email })
        }).then((user) => {
            if (user) {
                bcrypt.compare(password, user.password).then((verif) => {
                    if (verif) {
                        mongoose.disconnect()
                        resolve(user._id)
                    } else {
                        mongoose.disconnect()
                        reject('invalid password')
                    }
                })
            } else {
                mongoose.disconnect()
                reject('we dont have it')
            }

        }).catch((err) => {
            console.log(err)
        })
    })
}