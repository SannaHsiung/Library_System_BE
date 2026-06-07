import express from "express";
import { Category } from "./categories";
import { validateArticle } from "../schemas/Article";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export interface ReferenceBook {
  id: string;
  title: string;
  author: string;
  nbrPages: number;
  type: "Uppslagsbok";
  isBorrowable: false;
  categoryId: Category;
}

const referenceBooks: ReferenceBook[] = [
  {
    id: "581",
    title: "Mythology",
    author: "Edith Hamilton",
    nbrPages: 497,
    type: "Uppslagsbok",
    isBorrowable: false,
    categoryId: {
      id: "1009",
      name: "Religion och mytologi",
    },
  },
  {
    id: "687",
    title: "Atlas of Unexpected Places",
    author: "Elborough Travis",
    nbrPages: 224,
    type: "Uppslagsbok",
    isBorrowable: false,
    categoryId: {
      id: "1010",
      name: "Geografi och lokalhistoria",
    },
  },
];

router.get("/", async (req, res) => {
  const referenceBooks = await prisma.referenceBook.findMany();
  return res.send(referenceBooks);
});

router.get("/:id", async (req, res) => {
  const dvd = await prisma.referenceBook.findFirst({
    where: { id: req.params.id },
  });

  if (!dvd) return res.status(404).send("Kan inte hitta dvd:n");

  return res.send(dvd);
});

//håller på att fixa
//nedan ska fixas

router.post("/", (req, res) => {
  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0]?.message);

  const referenceBook: ReferenceBook = {
    id: Date.now().toString(),
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

router.put("/:id", (req, res) => {
  const referenceBook = referenceBooks.find(
    (refBook) => refBook.title === req.params.id,
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

router.delete("/:id", (req, res) => {
  const referenceBook = referenceBooks.find(
    (refBook) => refBook.title === req.params.id,
  );

  if (!referenceBook) return res.status(404).send("Kan inte hitta boken");

  referenceBooks.splice(referenceBooks.indexOf(referenceBook), 1);

  return res.send(referenceBook);
});

export default router;
