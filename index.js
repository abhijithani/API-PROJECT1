require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
var bodyParser = require("body-parser");


//database
const database = require("./database/database");

//model
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");


//Intializing express
const booky = express();

booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());
booky.use(cors())

mongoose.connect(process.env.MONGO__URL)
    .then(() => console.log("Connection has been established successfully"))
    .catch((err) => console.log("Connection failed:", err));
/*
 ROUTE        /
 DESCRIPTION GET all the book
 Access      PUBLIC
 Parameer    NONE
 Method      GET

 */


// booky.get("/", (req, res) => {
//     return res.json({ books: database.books });
// });

booky.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({ getAllBooks });
});

/*
 ROUTE    /is
 DESCRIPTION GET specifi book on ISBN
 Access      PUBLIC
 Parameer    isbn
 Method      GET  

 */

booky.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    // const specificBook = database.books.filter(
    //     (book) => book.ISBN === req.params.isbn);

    if (!getSpecificBook) {
        return res.json({ error: `no book found for ${req.params.isbn}` })
    }
    return res.json({ book: getSpecificBook });
});


/*
ROUTE    /is
DESCRIPTION GET specifi book on category
Access      PUBLIC
Parameer    category
Method      GET  

*/

booky.get("/c/:category", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ category: req.params.category });

    if (!getSpecificBook) {
        return res.json({ error: `no book found for ${req.params.category}` })
    }
    return res.json({ book: getSpecificBook });
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

// booky.get("/author", (req, res) => {
//     return res.json({ authors: database.author })
// })

booky.get("/author", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ getAllAuthors });
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


// booky.get("/publicatons", (req, res) => {
//     return res.json({ publications: database.publications })
// });


booky.get("/publicatons", async (req, res) => {
    const getAllPublication = await BookModel.find();
    return res.json({ getAllPublication });
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

//POST

/*
ROUTE        /book/new
DESCRIPTION  Add new books
Access      PUBLIC
Parameer    NONE
Method      POST
*/

booky.post("/book/new", async (req, res) => {
    try {

        const { newBook } = req.body;
        const addNewbook = await BookModel.create(newBook);

        return res.json({
            books: addNewbook,
            message: "new book added"
        })
    } catch (error) {
        console.log(error);
    }

});
// const newBook = req.body;
// database.books.push(newBook);
// return res.json({ updateBooks: database.books });





/*
ROUTE        /author/new
DESCRIPTION  Add new author
Access      PUBLIC
Parameer    NONE
Method      POST
*/

booky.post("/author/new", async (req, res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = await AuthorModel.create(newAuthor);

    return res.json({
        author: addNewAuthor,
        message: "author added"
    })
});

/*
ROUTE        /publications/new
DESCRIPTION  Add new publications
Access      PUBLIC
Parameer    NONE
Method      POST
*/

booky.post("/publications/new", async (req, res) => {
    const { newPublcations } = req.body;
    const addNewPublication = PublicationModel.create(newPublcations)
    // database.publications.push(newPublcations);
    return res.json({
        publications: addNewPublication,
        message: "new publication added"
    })
})





// booky.post("/publications/add", (req, res) => {
//     const addPublications = req.body;

//     const checkingExistence = database.publications.filter(
//         (pub) => pub.id === addPublications.id)


//     if (checkingExistence.length > 0) {
//         return res.json({ error: `Publication with ID ${addPublications.id} already exists` });
//     }
//     else {
//         database.publications.push(addPublications);
//         return res.json(database.publications);
//     }
// })



/*********** PUT ******************** */
/*
ROUTE        publications/update/book
DESCRIPTION  update book on isbn
Access      PUBLIC
Parameer    NONE
Method      POST
*/

booky.put("/book/update/:isbn", async (req, res) => {
    try {
        
        const updatebooktitle = await BookModel.findOneAndUpdate(
            {
                ISBN: req.params.isbn
            },
            {
                title: req.body.BookTitle
            },
            {
                new: true
            }
        );
        return res.json({
            books: updatebooktitle
        })
    } catch (error) {        
        res.status(500).send({err: error.message})
    }


});


/**************Upadating new author************** */
/*
ROUTE        book/author/update/
DESCRIPTION  update /add new author
Access      PUBLIC
Parameer    isbn
Method      POST
*/


booky.put("/book/author/update/:isbn", async (req, res) => {
    //update book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                author: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );

    //update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    )

    return res.json({
        books: updatedBook,
        author: updatedAuthor,
        message: "author updated"
    })
});









/*
ROUTE        publications/update/book
DESCRIPTION  update /add new publications
Access      PUBLIC
Parameer    NONE
Method      POST
*/

booky.put("/publications/update/book/:isbn", (req, res) => {
    //ADD NEW NEW BOOK IN PUBLICATION
    database.publications.forEach((pub) => {
        if (pub.id === req.body.pubID) {
            return pub.books.push(req.params.isbn);
        }
    });

    //UPDATE PUBLICATIONS IN BOOK
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publications = req.body.pubID;
            return;
        }
    });

    return res.json(
        {
            books: database.books,
            publication: database.publications,
            message: "succesfully updated"
        }
    );

});


//----DELETE ------
/*
ROUTE        /book/delete
DESCRIPTION   delete a boofk
Access      PUBLIC
Parameer    isbn
Method      POST
*/

booky.delete("/book/delete/:isbn", async (req, res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );
    return res.json({
        books: updatedBookDatabase,
        message: "book is deleted"
    })
});



// booky.delete("/book/delete/:isbn", (req, res) => {
//     //whichever book that dosent match with isbn send to updatebook
//     //and else are deleted

//     const updatedatedBooks = database.books.filter(
//         (book) => book.ISBN !== req.params.isbn
//     )
//     database.books = updatedatedBooks;

//     return res.json({ books: database.books })

// });




//----DELETE ------
/*
ROUTE        /book/delete
DESCRIPTION  DELETE AUTHOR FORM A BOOK
Access      PUBLIC
Parameer    isbn
Method      POST
*/

booky.delete(("/book/delete/author/:writer"), (req, res) => {
    database.books.forEach(
        (book) => book.author = book.author.filter(
            (author) => author != req.params.writer
        ))

    return res.json({ books: database.books })

});

//----DELETE ------
/*
ROUTE        /book/delete/author/
DESCRIPTION  DELETE Author from and related book from author
Access      PUBLIC
Parameer    isbn,authorId
Method      delete
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    //update the book database

    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newathorList = book.author.filter((eachauthor) => {
                eachauthor !== parseInt(req.params.authorId)
            })
            book.author = newathorList;
            return;
        }
    })

    //update the author database
    database.author.forEach((eachauthor) => {
        if (eachauthor.id === parseInt(req.params.authorId)) {
            const newbookofauthor = eachauthor.books.filter((books) => {
                books !== req.params.isbn
            })
            eachauthor.books = newbookofauthor;
            return;
        }
    })

    return res.json({
        books: database.books,
        author: database.author,
        message: "author was deleted"
    })
});

booky.listen(3000, () => {
    console.log("server is up and running");
});
