const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/fileRoutes');
const cors = require('cors');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  // methods: 'GET,POST,PUT,DELETE',  
  credentials: true,               
}));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
