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

//håller på att fixa
//nedan ska fixas

router.post("/", (req, res) => {
  const validation = validateCategory(req.body);
  console.log(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  const category: Category = {
    id: req.body.id,
    name: req.body.name,
  };

  categories.push(category);

  return res.status(201).send(category);
});

router.put("/:id", (req, res) => {
  const existing = categories.find((c) => c.id === req.params.id);

  if (!existing) return res.status(404).send("Kan inte hitta kategorien");

  const validation = validateCategory(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  const category: Category = {
    id: req.body.id,
    name: req.body.name,
  };

  return res.send(category);
});

router.delete("/:id", (req, res) => {
  const category = categories.find((c) => c.id === req.params.id);

  if (!category) return res.status(404).send("Kan inte hitta kategorien");

  categories.splice(categories.indexOf(category), 1);

  return res.send(category);
});

export default router;
