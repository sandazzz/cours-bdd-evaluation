const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const addresses = await prisma.address.findMany();
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const address = await prisma.address.findUnique({ where: { id_address: id } });
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { type, street, city, zip, country, id_user } = req.body;
    const created = await prisma.address.create({
      data: { type, street, city, zip, country, id_user: Number(id_user) },
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { type, street, city, zip, country, id_user } = req.body;
    const updated = await prisma.address.update({
      where: { id_address: id },
      data: { type, street, city, zip, country, id_user: Number(id_user) },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.address.delete({ where: { id_address: id } });
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;