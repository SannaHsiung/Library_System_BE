import express from "express";
import { Category } from "./categories";

const router = express.Router();

interface AudioBook {
  title: string;
  runTimeMinutes: number;
  type: "Ljudbok";
  isBorrowable: boolean;
  categoryId: Category;
}

const audioBooks: AudioBook[] = [
  {
    title: "Angels & Demons",
    runTimeMinutes: 1114,
    type: "Ljudbok",
    isBorrowable: false,
    categoryId: { category: "Skönlitteratur" },
  },
  {
    title: "Underwater Archaeology",
    runTimeMinutes: 342,
    type: "Ljudbok",
    isBorrowable: true,
    categoryId: { category: "Arkeologi" },
  },
  {
    title: "The Second World War",
    runTimeMinutes: 244,
    type: "Ljudbok",
    isBorrowable: true,
    categoryId: { category: "Historia" },
  },
];

router.get("/", (req, res) => {
  return res.send(audioBooks);
});

export default router;
