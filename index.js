const express = require('express')
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)



const path = require('path')
const bookController = require('./controllers/book')
const bookController6 = require('./controllers/book')
const bookController1 = require('./controllers/book')
const routerAuth = require('./routers/auth.route')

const BookModel = require('./models/book')
const app = express()




app.use(express.static(path.join(__dirname, 'assets')))
app.set('view engine', 'ejs')




app.get('/', (req, res, next) => {
    BookModel.getsixbooks().then(books => {
        res.render('index', { books: books,verifuser:req.session.userId })
    })

})

app.get('/contact', (req, res, next) => {
    res.render('contact',{verifuser:req.session.userId})
})

app.get('/about', (req, res, next) => {
    res.render('about',{verifuser:req.session.userId})
})



var Store = new MongoDbStore({
    uri: 'mongodb://localhost:27017/Library',
    collection: 'session'
})
app.use(session({
    secret: 'EXODIA the forbidden one !',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: store,
    resave: true,
    saveUninitialized: true,

}))




app.get('/books/:id', (req, res, next) => {
    BookModel.getonebook(req.params.id).then(book => {
        res.render('details', { book: book ,verifuser:req.session.userId})
    })
})

app.get('/books', (req, res, next) => {
    BookModel.getallbooks().then(books => {
        res.render('books', { books: books ,verifuser:req.session.userId})
    })
})
app.use('/', routerAuth)













app.listen(30019, () => console.log('server is running on port 30019'))