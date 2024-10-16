const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Your user model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
const dbURI = 'mongodb+srv://jameskinyanjui5135:fJXwTNNuN5k5G7OI@updated.x9brx.mongodb.net/updated';
mongoose.connect(dbURI)
    .then(() => console.log('Mongoose connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Signup endpoint
app.post('/register', async (req, res) => {
    const { fName, lName, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save to the database
        const newUser = new User({
            firstName: fName,
            lastName: lName,
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare password
        const isMatch = await user.comparePassword(password); // Use comparePassword from model

        if (isMatch) {
            // Successful login, redirect to home.html
            return res.redirect('/home.html'); 
        } else {
            return res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
