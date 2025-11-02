import userRoutes from './user.routes.js';
import addressRoutes from './address.routes.js';
import orderRoutes from './order.routes.js';
import orderItemRoutes from './order-item.routes.js';
import categoryRoutes from './category.routes.js';
import productRoutes from './product.routes.js';
import cartRoutes from './cart.routes.js';
import reviewRoutes from './review.routes.js';

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
