import express from "express";
import { Category } from "./categories";

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

export default router;
