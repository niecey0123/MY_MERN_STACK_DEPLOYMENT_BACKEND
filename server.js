require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// app.use(express.json());
// app.use(cors()); 

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
    image: String,
});

const Book = mongoose.model('Book', bookSchema);

const seedDatabase = async () => {
    try {
        await Book.deleteMany(); // Clear existing data

        const books = [
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description: 'A classic novel about the American Dream', price: 20, image: 'https://m.media-amazon.com/images/I/51jPo0RDFUL.jpg' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', description: 'A powerful story of racial injustice and moral growth', price: 15, image: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg' },
            { title: '1984', author: 'George Orwell', genre: 'Dystopian', description: 'A dystopian vision of a totalitarian future society', price: 22, image: 'https://m.media-amazon.com/images/I/81StSOpmkjL._AC_UF1000,1000_QL80_.jpg' },
            { title: 'The 48 Laws of Power', author: 'Robert Greene', genre: 'Fiction', description: 'Amoral, cunning, ruthless, and instructive, this multi-million-copy New York Times bestseller is the definitive manual for anyone interested in gaining, observing, or defending against ultimate control – from the author of The Laws of Human Nature.', price: 18, image: 'https://m.media-amazon.com/images/I/61UZS3QA1UL._SY522_.jpg' },
            { title: 'Invisible Son ', author: 'Kim Johnson ', genre: 'Fiction', description: 'Critically acclaimed author Kim Johnson delivers another social justice thriller that shines a light on being young and Black in America—perfect for fans of The Hate U Give by Angie Thomas and Dear Justyce by Nic Stone.', price: 35, image: 'https://m.media-amazon.com/images/I/8138cNtUJpL._SY522_.jpg' },
        
        ];
        
        await Book.insertMany(books);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();

app.get('/api/books', async (req, res) => {
    try {
        
        const allBooks = await Book.find();

        res.json(allBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});