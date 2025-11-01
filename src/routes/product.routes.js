import { Router } from "express";
import Product from '../../mongo/models/product.model.js';
import Review from '../../mongo/models/review.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const created = await Product.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id/with-reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const reviews = await Review.find({ product_id: req.params.id });
    res.json({ product, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/stats/avg-rating', async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: '$product_id',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { avgRating: -1 },
      },
    ];
    const stats = await Review.aggregate(pipeline);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;