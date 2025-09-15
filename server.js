const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// App y middlewares
const app = express();
app.use(cors());
app.use(express.json());

// Swagger (deja esto tal cual)
const setupSwagger = require('./docs/swagger');
setupSwagger(app);

// Rutas
app.get('/', (req, res) => res.send('API Proyecto 6 funcionando'));
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno' });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI no está definido en .env');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB Atlas');

    mongoose.connection.on('error', (err) => {
      console.error('Error de MongoDB:', err.message);
    });

    app.listen(PORT, () => {
      console.log(`Server on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('No se pudo conectar a MongoDB:', err.message);
    process.exit(1); 
  }
})();
