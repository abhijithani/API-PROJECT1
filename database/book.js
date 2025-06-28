const mongoose = require ("mongoose");

const BookSchema = mongoose.Schema(
     {
        ISBN: String,
        title: String,
        pubdate: String,
        language: String,
        numpage: Number,
        author: [Number],
        publications: [Number],
        category: [String]
    }
);

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;

