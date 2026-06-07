import express from "express";
import { Category, getCategories } from "./categories";
import { validateArticle } from "../schemas/Article";

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

router.get("/:titleRoute", (req, res) => {
  const audioBook = audioBooks.find((ab) => ab.title === req.params.titleRoute);

  if (!audioBook) return res.status(404).send("Kan inte hitta ljudboken");

  return res.send(audioBook);
});

router.post("/", (req, res) => {
  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0]?.message);

  const audioBook: AudioBook = {
    title: req.body.title,
    runTimeMinutes: req.body.runTimeMinutes,
    type: req.body.type,
    isBorrowable: true,
    categoryId: req.body.categoryId.category,
  };

  audioBooks.push(audioBook);

  return res.status(201).send(audioBook);
});

router.put("/:titleRoute", (req, res) => {
  const audiobook = audioBooks.find((ab) => ab.title === req.params.titleRoute);

  if (!audiobook) return res.status(404).send("Kan inte hitta ljudboken");

  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  audiobook.title = req.body.title;
  audiobook.runTimeMinutes = req.body.runTimeMinutes;
  audiobook.type = req.body.type;
  audiobook.isBorrowable = true;
  audiobook.categoryId = req.body.categoryId.category;

  return res.send(audiobook);
});

export default router;
