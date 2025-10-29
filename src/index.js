require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

require('./prismaClient');

const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/orders', orderRoutes);
app.use('/order-items', orderItemRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'E‑commerce API is running.' });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();