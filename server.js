require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bootcampRoutes = require('./routes/bootcamp.routes');

// Rutas públicas
app.use('/api', authRoutes);  // /api/signin y /api/signup

// Rutas con prefijo específico
app.use('/api/user', userRoutes);
app.use('/api/bootcamp', bootcampRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
