const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/operations');
require('dotenv').config(); // Load .env variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'Frontend' folder
app.use(express.static('Frontend'));

app.get('/', (req, res) => {
    res.send('Server is up and running!');
  });
  
// Routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
