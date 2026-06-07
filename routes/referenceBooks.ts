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

  const newReferenceBook = await prisma.referenceBook.create({
    data: {
      title = req.body.title;
      author = req.body.author;
      type = req.body.type;
      nbrPages = req.body.nbrPages;
      isBorrowable = true;
      categoryId: req.body.categoryId,
    },
  });

  return res.status(201).send(newReferenceBook);
});
*/

/*
router.put("/:id", async (req, res) => {
  const referenceBook = await prisma.referenceBook.findFirst({
    where: { id: req.params.id },
  });

  if (!referenceBook) return res.status(404).send("Kan inte hitta ljudboken");

  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  const updatedReferenceBook = await prisma.referenceBook.update({
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

  return res.send(updatedReferenceBook);
});
*/

router.delete("/:id", async (req, res) => {
  const referenceBook = await prisma.referenceBook.findFirst({
    where: { id: req.params.id },
  });

  if (!referenceBook) return res.status(404).send("Kan inte hitta kategorien");

  const deletedReferenceBook = await prisma.referenceBook.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedReferenceBook);
});
export default router;
