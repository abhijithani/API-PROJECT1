const mongoose = require ("mongoose");

const AuthorSchema = mongoose.Schema(
     {
        id: Number,
        name: String,
        books: [String]
    }
);

const Authormodel = mongoose.model("author", AuthorSchema);

module.exports = Authormodel;