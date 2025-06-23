const express = require("express");


//database
const database = require("./database");

//Intializing express
const booky = express();




/*
 ROUTE        /
 DESCRIPTION GET all the book
 Access      PUBLIC
 Parameer    NONE
 Method      GET

 */
booky.get("/", (req, res) => {
    return res.json({ books: database.books });
});

/*
 ROUTE    /is
 DESCRIPTION GET specifi book on ISBN
 Access      PUBLIC
 Parameer    isbn
 Method      GET  

 */

booky.get("/is/:isbn", (req, res) => {
    const specificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn);

    if (specificBook.length === 0) {
        return res.json({ error: `no book found for $(req.params.isbn)` })
    }
    return res.json({ book: specificBook });
});


/*
ROUTE    /is
DESCRIPTION GET specifi book on category
Access      PUBLIC
Parameer    category
Method      GET  

*/

booky.get("/c/:category", (req, res) => {
    const getspecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )

    if (getspecificBook.length === 0) {
        return res.json({ error: `no book found for this  ${req.params.category}` })
    }
    return res.json({ book: getspecificBook })
})


/*
ROUTE    /lan
DESCRIPTION GET specifi book on langauge
Access      PUBLIC
Parameer    language
Method      GET  

*/

booky.get("/lan/:language", (req, res) => {
    const getsepecificBook = database.books.filter(
        (book) => book.langauge === req.params.language);

    if (getsepecificBook.length === 0) {
        return res.json({ error: `no book found for this ${req.params.language}` })
    }
    return res.json({ book: getsepecificBook })
}
);

/*
ROUTE    /author
DESCRIPTION to get all the authors
Access      PUBLIC
Parameer    NONE
Method      GET  

*/

booky.get("/author", (req, res) => {
    return res.json({ authors: database.author })
})

/*
ROUTE    /author
DESCRIPTION to get a specific author
Access      PUBLIC
Parameer    name
Method      GET  

*/

booky.get("/author/:name", (req, res) => {
    const getspecificauthor = database.author.filter((ezhuth) =>
        ezhuth.name === req.params.name)
    if (getspecificauthor.length === 0) {
        return res.json({ error: `author is no found as named as ${req.params.name}` })
    }
    return res.json({ auhtor: getspecificauthor })
});


/*
ROUTE    /author/book
DESCRIPTION /to get a list of authores based on books
Access      PUBLIC
Parameer    isbn
Method      GET  

*/

booky.get("/author/book/:isbn", (req, res) => {
    const getspecificauthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    )
    if (getspecificauthor === 0) {
        return res.json({ error: `no author found for this book ${req.params.isbn}` })
    }
    return res.json({ authors: getspecificauthor })
}
)

/*
ROUTE    /publications
DESCRIPTION to get all the publications
Access      PUBLIC
Parameer    NONE
Method      GET  

*/


booky.get("/publicatons", (req, res) => {
    return res.json({ publications: database.publications })
});

/*
ROUTE    /publications
DESCRIPTION to get a sepcific publications
Access      PUBLIC
Parameer    name
Method      GET  

*/

booky.get("/publications/:name", (req, res) => {
    const getspecifications = database.publications.filter((name) =>
        name.name === req.params.name)
    if (getspecifications.length === 0) {
        return res.json({ error: `no publicationd is not found for ${req.params.name}` })
    }
    return res.json({ publications: getspecifications })
})
/*
ROUTE    /publications
DESCRIPTION to get a list of publications based on a book
Access      PUBLIC
Parameer    NONE
Method      GET  

*/

booky.get("/publications/book/:isbn", (req, res) => {
    const getspecificpublications = database.publications.filter(
        (book) => book.books.includes(req.params.isbn))
    if (getspecificpublications.lenght === 0) {
        return res.json({ error: `not found publications for this book ${req.params.isbn}` })
    }
    return res.json({ publications: getspecificpublications })
})

booky.listen(3000, () => {
    console.log("server is up and runnig");
});