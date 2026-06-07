import express from "express";

const router = express.Router();

interface Category {
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

router.get("/", (req, res) => {
  return res.send(categories);
});

export default router;
