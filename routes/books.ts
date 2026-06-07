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

/*
router.post("/", async (req, res) => {
  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0]?.message);

  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });

  if (!category) {
    return res.status(400).send("Kategorien finns inte");
  }

  const newBook = await prisma.book.create({
    data: {
      title = req.body.title;
      author = req.body.author;
      type = req.body.type;
      nbrPages = req.body.nbrPages;
      isBorrowable = true;
      categoryId: req.body.categoryId,
    },
  });

  return res.status(201).send(newBook);
});
*/

/*
router.put("/:id", async (req, res) => {
  const book = await prisma.book.findFirst({
    where: { id: req.params.id },
  });

  if (!book) return res.status(404).send("Kan inte hitta ljudboken");

  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  const updatedBook = await prisma.book.update({
    where: { id: req.params.id },
    data: {
      title = req.body.title;
      type = req.body.type;
      author = req.body.author;
      nbrPages = req.body.nbrPages;
      isBorrowable = req.body.isBorrowable;
      categoryId = req.body.categoryId.category;
    },
  });

  return res.send(updatedBook);
});
*/

router.delete("/:id", async (req, res) => {
  const book = await prisma.book.findFirst({
    where: { id: req.params.id },
  });

  if (!book) return res.status(404).send("Kan inte hitta kategorien");

  const deletedBook = await prisma.book.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedBook);
});
export default router;
