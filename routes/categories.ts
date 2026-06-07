import express from "express";
import { validateCategory } from "../schemas/Category";

const router = express.Router();

export interface Category {
  category: string;
}

const categories: Category[] = [
  {
    category: "Skönlitteratur",
  },
  {
    category: "Arkeologi",
  },
  {
    category: "Historia",
  },
  {
    category: "Filosofi och psykologi",
  },
  {
    category: "Ekonomi och näringsväsen",
  },
  {
    category: "Musikalier",
  },
  {
    category: "Science Fiction",
  },
  {
    category: "Fantasy",
  },
  {
    category: "Action",
  },
  {
    category: "Religion och mytologi",
  },
  {
    category: "Geografi och lokalhistoria",
  },
  {
    category: "Naturvetenskap",
  },
];

export function getCategories() {
  return categories;
}

router.get("/", (req, res) => {
  return res.send(categories);
});

router.get("/:categoryRoute", (req, res) => {
  const category = categories.find(
    (c) => c.category === req.params.categoryRoute,
  );

  if (!category) return res.status(404).send("Kan inte hitta kategorien");

  return res.send(category);
});

router.post("/", (req, res) => {
  const validation = validateCategory(req.body);
  console.log(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  const category: Category = {
    category: req.body.category,
  };

  categories.push(category);

  return res.status(201).send(category);
});

router.put("/:categoryRoute", (req, res) => {
  const category = categories.find(
    (c) => c.category === req.params.categoryRoute,
  );

  if (!category) return res.status(404).send("Kan inte hitta kategorien");

  const validation = validateCategory(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  category.category = req.body.category;

  return res.send(category);
});

export default router;
