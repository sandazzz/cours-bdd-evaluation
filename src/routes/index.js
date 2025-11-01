import userRoutes from './userRoutes.js';
import addressRoutes from './addressRoutes.js';
import orderRoutes from './orderRoutes.js';
import orderItemRoutes from './orderItemRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';
import reviewRoutes from './reviewRoutes.js';

export default function router(app) {
  app.use('/users', userRoutes);
  app.use('/addresses', addressRoutes);
  app.use('/orders', orderRoutes);
  app.use('/order-items', orderItemRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/products', productRoutes);
  app.use('/carts', cartRoutes);
  app.use('/reviews', reviewRoutes);
}
