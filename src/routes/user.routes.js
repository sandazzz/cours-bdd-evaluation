import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        addresses: true,
        orders: {
          include: {
            items: true,
          },
        },
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id_user: id },
      include: {
        addresses: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      email,
      firstname,
      lastname,
      password,
      role,
      addresses = [],
    } = req.body;

    const created = await prisma.user.create({
      data: {
        email,
        firstname,
        lastname,
        password,
        role,
        addresses: {
          create: addresses.map((address) => ({
            type: address.type,
            street: address.street,
            city: address.city,
            zip: address.zip,
            country: address.country,
          })),
        },
      },
    });
    
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { email, firstname, lastname, password, role } = req.body;
    const updated = await prisma.user.update({
      where: { id_user: id },
      data: { email, firstname, lastname, password, role },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.user.delete({ where: { id_user: id } });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id/full", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id_user: id },
      include: {
        addresses: true,
        orders: {
          include: {
            items: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
