import express from "express";
import { validateCategory } from "../schemas/Category";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  {
    id: "1000",
    name: "Skönlitteratur",
  },
  {
    id: "1001",
    name: "Arkeologi",
  },

  {
    id: "1002",
    name: "Naturvetenskap",
  },

  {
    id: "1005",
    name: "Musikalier",
  },
  {
    id: "1006",
    name: "Science Fiction",
  },

  {
    id: "1009",
    name: "Religion och mytologi",
  },
  {
    id: "1010",
    name: "Geografi och lokalhistoria",
  },
];

export function getCategories() {
  return categories;
}

router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany();
  return res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });

  if (!category) return res.status(404).send("Kan inte hitta kategorien");

  return res.send(category);
});

router.post("/", async (req, res) => {
  const validation = validateCategory(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  const newCategory = await prisma.category.create({
    data: { name: req.body.name },
  });

  return res.status(201).send(newCategory);
});

router.put("/:id", async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });

  if (!category) return res.status(404).send("Kan inte hitta kategorien");

  const validation = validateCategory(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  const updatedCategory = await prisma.category.update({
    where: { id: req.params.id },
    data: { name: req.body.name },
  });

  return res.send(updatedCategory);
});

router.delete("/:id", async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });

  if (!category) return res.status(404).send("Kan inte hitta kategorien");

  const deleteCategory = await prisma.category.delete({
    where: { id: req.params.id },
  });

  return res.send(deleteCategory);
});

export default router;
