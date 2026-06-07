import express from "express";
import { Category } from "./categories";

const router = express.Router();

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

router.get("/", (req, res) => {
  return res.send(books);
});

export default router;
