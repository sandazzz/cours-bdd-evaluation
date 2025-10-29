const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const includeItems = req.query.includeItems === 'true';
    const orders = await prisma.order.findMany({
      include: includeItems ? { items: true } : undefined,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id_order: id },
      include: {
        items: true,
        user: true,
      },
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_user, status, payment_method, items = [] } = req.body;
    let total = 0;
    if (Array.isArray(items)) {
      items.forEach((item) => {
        total += Number(item.unit_price) * Number(item.quantity);
      });
    }
    const created = await prisma.$transaction(async (prismaTx) => {
      const order = await prismaTx.order.create({
        data: {
          id_user: Number(id_user),
          status,
          total_amount: total,
          payment_method,
        },
      });
      if (items.length) {
        const orderItemsData = items.map((item) => ({
          id_order: order.id_order,
          product_id: Number(item.product_id),
          quantity: Number(item.quantity),
          unit_price: Number(item.unit_price),
        }));
        await prismaTx.order_item.createMany({ data: orderItemsData });
      }
      return order;
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, payment_method, total_amount, id_user } = req.body;
    const updated = await prisma.order.update({
      where: { id_order: id },
      data: {
        status,
        payment_method,
        total_amount: total_amount !== undefined ? Number(total_amount) : undefined,
        id_user: id_user !== undefined ? Number(id_user) : undefined,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.order.delete({ where: { id_order: id } });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/stats/user-spending', async (req, res) => {
  try {
    const stats = await prisma.order.groupBy({
      by: ['id_user'],
      _sum: { total_amount: true },
      orderBy: {
        _sum: {
          total_amount: 'desc',
        },
      },
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/stats/product-quantities', async (req, res) => {
  try {
    const stats = await prisma.order_item.groupBy({
      by: ['product_id'],
      _sum: { quantity: true },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;