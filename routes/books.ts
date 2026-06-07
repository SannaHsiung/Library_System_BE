import express from "express";
import { Category } from "./categories";
import { validateArticle } from "../schemas/Article";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export interface Book {
  id: string;
  title: string;
  author: string;
  nbrPages: number;
  type: "Bok";
  isBorrowable: boolean;
  categoryId: Category;
}

const books: Book[] = [
  {
    id: "56",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    nbrPages: 689,
    type: "Bok",
    isBorrowable: true,
    categoryId: {
      id: "1000",
      name: "Skönlitteratur",
    },
  },
  {
    id: "59",
    title: "Black Holes",
    author: "Brian Cox",
    nbrPages: 288,
    type: "Bok",
    isBorrowable: true,
    categoryId: {
      id: "1002",
      name: "Naturvetenskap",
    },
  },
];

router.get("/", async (req, res) => {
  const books = await prisma.book.findMany();
  return res.send(books);
});

router.get("/:id", async (req, res) => {
  const dvd = await prisma.book.findFirst({
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

  const book: Book = {
    id: Date.now().toString(),
    title: req.body.title,
    author: req.body.author,
    nbrPages: req.body.nbrPages,
    type: req.body.type,
    isBorrowable: true,
    categoryId: req.body.categoryId.category,
  };

  books.push(book);

  return res.status(201).send(book);
});

router.put("/:id", (req, res) => {
  const book = books.find((b) => b.title === req.params.id);

  if (!book) return res.status(404).send("Kan inte hitta boken");

  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  book.title = req.body.title;
  book.author = req.body.author;
  book.type = req.body.type;
  book.nbrPages = req.body.nbrPages;
  book.isBorrowable = true;
  book.categoryId = req.body.categoryId.category;

  return res.send(book);
});

router.delete("/:id", (req, res) => {
  const book = books.find((b) => b.title === req.params.id);

  if (!book) return res.status(404).send("Kan inte hitta boken");

  books.splice(books.indexOf(book), 1);

  return res.send(book);
});

export default router;
