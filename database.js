const books = [
    {
        ISBN: "12345books",
        title: "Tesla",
        pubdate: "2025-06-23",
        langauge: "en",
        numpage: 240,
        author: [1, 2],
        publications: [1],
        category: ["tech", "space", "education"]
    }
];

const author = [
    {
        id: 1,
        name: "abhijithms",
        books: ["12345books", "secretbook"]
    },
    {
        id: 2,
        name: "sivajith",
        books: ["12345books"]
    }
];

const publications = [
    {
        id: 1,
        name: "writex",
        books: ["12345books", "743book"]
    },
    {
        id: 2,
        name: "rudeex",
        books: ["324books"]
    },
    {
        id: 3,
        name: "kritz",
        books: ["567"]
    },
];

module.exports = { books, author, publications };
