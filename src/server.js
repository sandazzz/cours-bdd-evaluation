import express from 'express';
import router from './routes/index.js';

const app = express();

app.use(express.json());

router(app);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'E-commerce API is running.' });
});

export default app;
