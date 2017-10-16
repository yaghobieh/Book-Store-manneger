var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser')
var app        = express();
var port       = process.env.PORT || 3000;

app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Static files
app.use(express.static(__dirname + '/public'));

// Create book reference
Book = require('./models/book');

// Server section connection
mongoose.connect('mongodb://localhost:27017/bookstore', {useMongoClient: true});
var server = mongoose.connection;

// Get all books
app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
        if (err) throw err;
        res.json(books);
    });
});

// Get book by id
app.post('/api/books/:_id', function(req, res){
    var id = req.params._id;

    Book.getBookById(id, function(err, book){
        if (err) throw err;
        res.json(book);
    });
});

// New Book
app.post('/api/books', function(req, res){
    var book = req.body;

    Book.addBook(book, function(err, book){
        if (err) throw err;
        res.json(book);
    });
});

app.put('/api/books/:_id', function(req, res){
    var id = req.params._id;
    var book = req.body;

    Book.updateBook(id, book, {}, function(err, book){
        if (err) throw err;
        res.json(book);
    })
});

app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id;
	Book.removeBook(id, function(err, book){
		if (err) throw err;
        res.json(book);
	});
});

app.get('*', function(req, res){
    res.status(404).send('This page is not found!')
});

app.listen(port, function(){
    console.log('Server is running');
})