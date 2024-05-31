BookModel = require('../models/book')


exports.bookController = (req, res, next) => {
    BookModel.getallbooks().then(books => {
        res.render('books', { books: books })
    })
}

exports.bookController6 = (req, res, next) => {
    BookModel.getallbooks().then(books => {
        res.render('index', { books: books })
    })
}

exports.bookController1 = (req, res, next) => {
    let id = req.params.id;
    BookModel.getonebook(id).then(book => {
        res.render('details', { book: book });
    }).catch(err => {
        // Gérer l'erreur ici
        console.error(err);
        res.status(500).send('Une erreur s\'est produite');
    });
};