const express = require('express');
const { error } = require('node:console');
const app = express();
const PORT = 3000;

app.use(express.json());

// Your routes here

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

let books = [];

app.get('/whoami', (req, res)=>{
    res.status(200).json(

        {
            "studentNumber": "2627330"
        }
)
});

app.get('/books', (req, res)=>{
    res.status(200).json(books)
})

app.get('/books/:id', (req, res)=>{
    const bookId = req.params.id;
    console.log(bookId);


    const book = books.find(b=>b.id === bookId);

    if (!book){
        return res.status(404).json({error: "Book not found" });
    }

    res.status(200).json(book);
});

app.post('/books', (req, res)=>{

    const Id = parseInt(req.params.Id);
    const newBook = req.body;

     if (!newBook.id || !newBook.title || !newBook.details) {
        return res.status(400).json({  error: "Missing required fields"});
    }


    books.push(newBook);

    res.status(201).json({newBook})

});

app.put('/books/:id', (req, res)=>{
    const bookId = req.params;
    const book = books.find(b=>b.id === bookId);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    const { title, author, genre, publicationYear } = req.body;

    if (title) {
        book.title = title;
    }

    if (book.details && book.details.length > 0) {
        if (author) {
            book.details[0].author = author;
        }

        if (genre) {
            book.details[0].genre = genre;
        }

        if (publicationYear) {
            book.details[0].publicationYear = publicationYear;
        }
    }

    res.status(200).json(book);

    
}
);

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    books.splice(bookIndex, 1);

    res.status(204).send();
});

app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    const newDetail = {
        id: req.body.id,
        author: req.body.author,
        genre: req.body.genre,
        publicationYear: req.body.publicationYear
    };

    book.details.push(newDetail);

    res.status(201).json(book);
});

app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book or detail not found" });
    }

    const detailIndex = book.details.findIndex(
        d => d.id === req.params.detailId
    );

    if (detailIndex === -1) {
        return res.status(404).json({ error: "Book or detail not found" });
    }

    
    book.details.splice(detailIndex, 1);

    res.status(204).send();
});
