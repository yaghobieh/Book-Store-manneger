var mongoose = require('mongoose');

// Book Schema
var bookSchema = mongoose.Schema({
    title: { type: String, require: true },
    author : { type: String },
    create_date: { type: Date, default: Date.now },
    pages : { type: String },
    img_url : { type: String },
    description: { type: String, require: true }
});

const Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = function(callback, limit) {
	Book.find(callback).limit(limit);
}

// Get Books by ID
module.exports.getBookById = function(id, callback) {
	Book.findById(id, callback);
}

// Add new book
module.exports.addBook = function(book, callback){
    Book.create(book, callback);
}

// Update Book
module.exports.updateBook = function(id, book, options, callback)  {
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		buy_url: book.buy_url
    }
    
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.removeBook = function(id, callback) {
	var query = {_id: id};
	Book.remove(query, callback);
}

