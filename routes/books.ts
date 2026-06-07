import express from "express";
import { Category } from "./categories";
import { validateArticle } from "../schemas/Article";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

interface Book {
  title: string;
  author: string;
  nbrPages: number;
  type: "Bok";
  isBorrowable: boolean;
  categoryId: Category;
}

const books: Book[] = [
  {
    title: "The Lord of the Rings",
    author: "J. R. R. Tolkien",
    nbrPages: 1077,
    type: "Bok",
    isBorrowable: false,
    categoryId: { category: "Skönlitteratur" },
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    nbrPages: 689,
    type: "Bok",
    isBorrowable: true,
    categoryId: { category: "Skönlitteratur" },
  },
  {
    title: "Omgiven av idioter : hur man förstår dem som inte går att förstå",
    author: "Thomas Erikson",
    nbrPages: 299,
    type: "Bok",
    isBorrowable: true,
    categoryId: { category: "Filosofi och psykologi" },
  },
  {
    title: "Lilla kokboken för studenter",
    author: "Alastair Williams",
    nbrPages: 128,
    type: "Bok",
    isBorrowable: true,
    categoryId: { category: "Ekonomi och näringsväsen" },
  },
  {
    title: "Black Holes",
    author: "Brian Cox",
    nbrPages: 288,
    type: "Bok",
    isBorrowable: true,
    categoryId: { category: "Naturvetenskap" },
  },
];

router.get("/", async (req, res) => {
  const books = await prisma.book.findMany();
  return res.send(books);
});

//nedan ska fixas

router.get("/:titleRoute", (req, res) => {
  const book = books.find((b) => b.title === req.params.titleRoute);

  if (!book) return res.status(404).send("Kan inte hitta boken");

  return res.send(book);
});

router.post("/", (req, res) => {
  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0]?.message);

  const book: Book = {
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

router.put("/:titleRoute", (req, res) => {
  const book = books.find((b) => b.title === req.params.titleRoute);

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

router.delete("/:titleRoute", (req, res) => {
  const book = books.find((b) => b.title === req.params.titleRoute);

  if (!book) return res.status(404).send("Kan inte hitta boken");

  books.splice(books.indexOf(book), 1);

  return res.send(book);
});

export default router;
