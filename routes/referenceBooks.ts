import express from "express";
import { Category, getCategories } from "./categories";
import { validateArticle } from "../schemas/Article";

const router = express.Router();

interface ReferenceBook {
  title: string;
  author: string;
  nbrPages: number;
  type: "Uppslagsbok";
  isBorrowable: false;
  categoryId: Category;
}

const referenceBooks: ReferenceBook[] = [
  {
    title: "Mythology",
    author: "Edith Hamilton",
    nbrPages: 497,
    type: "Uppslagsbok",
    isBorrowable: false,
    categoryId: { category: "Religion och mytologi" },
  },
  {
    title: "Atlas of Unexpected Places",
    author: "Elborough Travis",
    nbrPages: 224,
    type: "Uppslagsbok",
    isBorrowable: false,
    categoryId: { category: "Geografi och lokalhistoria" },
  },
];

router.get("/", (req, res) => {
  return res.send(referenceBooks);
});

router.get("/:titleRoute", (req, res) => {
  const referenceBook = referenceBooks.find(
    (refBook) => refBook.title === req.params.titleRoute,
  );

  if (!referenceBook)
    return res.status(404).send("Kan inte hitta uppslagsboken");

  return res.send(referenceBook);
});

router.post("/", (req, res) => {
  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0]?.message);

  const referenceBook: ReferenceBook = {
    title: req.body.title,
    author: req.body.author,
    nbrPages: req.body.nbrPages,
    type: req.body.type,
    isBorrowable: false,
    categoryId: req.body.categoryId.category,
  };

  referenceBooks.push(referenceBook);

  return res.status(201).send(referenceBook);
});

router.put("/:titleRoute", (req, res) => {
  const referenceBook = referenceBooks.find(
    (refBook) => refBook.title === req.params.titleRoute,
  );

  if (!referenceBook)
    return res.status(404).send("Kan inte hitta uppslagsboken");

  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  referenceBook.title = req.body.title;
  referenceBook.author = req.body.author;
  referenceBook.type = req.body.type;
  referenceBook.nbrPages = req.body.nbrPages;
  referenceBook.isBorrowable = false;
  referenceBook.categoryId = req.body.categoryId.category;

  return res.send(referenceBook);
});

export default router;
