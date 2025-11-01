import { Router } from "express";
import prisma from '../lib/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const items = await prisma.order_item.findMany();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = await prisma.order_item.findUnique({ where: { id_order_item: id } });
    if (!item) {
      return res.status(404).json({ error: 'Order item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /order-items - create a new order item
router.post('/', async (req, res) => {
  try {
    const { product_id, quantity, unit_price, id_order } = req.body;
    const created = await prisma.order_item.create({
      data: {
        product_id: Number(product_id),
        quantity: Number(quantity),
        unit_price: Number(unit_price),
        id_order: Number(id_order),
      },
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /order-items/:id - update an order item
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { product_id, quantity, unit_price, id_order } = req.body;
    const updated = await prisma.order_item.update({
      where: { id_order_item: id },
      data: {
        product_id: product_id !== undefined ? Number(product_id) : undefined,
        quantity: quantity !== undefined ? Number(quantity) : undefined,
        unit_price: unit_price !== undefined ? Number(unit_price) : undefined,
        id_order: id_order !== undefined ? Number(id_order) : undefined,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /order-items/:id - delete an order item
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.order_item.delete({ where: { id_order_item: id } });
    res.json({ message: 'Order item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;