const mongoose = require('mongoose')



var schemabook = mongoose.Schema({
    _id: String,
    title: String,
    description: String,
    price: String,
    author: String,
    image: String,
})

var Book = mongoose.model('book', schemabook)
var url = 'mongodb://localhost:27017/Library'
exports.getallbooks = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.find({})
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))
    })
}

exports.getsixbooks = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.find({}).limit(3)
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))
    })
}


exports.getonebook = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.findById(id)
        }).then(book => {
            mongoose.disconnect()
            resolve(book)
        }).catch(err => reject(err))
    })
}