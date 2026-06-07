import express from "express";
import { Category } from "./categories";
import { validateArticle } from "../schemas/Article";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export interface AudioBook {
  id: string;
  title: string;
  runTimeMinutes: number;
  type: "Ljudbok";
  isBorrowable: boolean;
  categoryId: Category;
}

const audioBooks: AudioBook[] = [
  {
    id: "22",
    title: "Angels & Demons",
    runTimeMinutes: 1114,
    type: "Ljudbok",
    isBorrowable: true,
    categoryId: {
      id: "1000",
      name: "Skönlitteratur",
    },
  },
  {
    id: "28",
    title: "Underwater Archaeology",
    runTimeMinutes: 342,
    type: "Ljudbok",
    isBorrowable: true,
    categoryId: {
      id: "1001",
      name: "Arkeologi",
    },
  },
];

router.get("/", async (req, res) => {
  const audioBooks = await prisma.audioBook.findMany();
  return res.send(audioBooks);
});

router.get("/:id", async (req, res) => {
  const audioBook = await prisma.audioBook.findFirst({
    where: { id: req.params.id },
  });

  if (!audioBook) return res.status(404).send("Kan inte hitta ljudboken");

  return res.send(audioBook);
});

//håller på att fixa
//nedan ska fixas

router.post("/", (req, res) => {
  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0]?.message);

  const audioBook: AudioBook = {
    id: Date.now().toString(),
    title: req.body.title,
    runTimeMinutes: req.body.runTimeMinutes,
    type: req.body.type,
    isBorrowable: true,
    categoryId: req.body.categoryId.category,
  };

  audioBooks.push(audioBook);

  return res.status(201).send(audioBook);
});

router.put("/:id", (req, res) => {
  const audiobook = audioBooks.find((ab) => ab.title === req.params.id);

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

router.delete("/:id", (req, res) => {
  const audioBook = audioBooks.find((ab) => ab.title === req.params.id);

  if (!audioBook) return res.status(404).send("Kan inte hitta ljudboken");

  audioBooks.splice(audioBooks.indexOf(audioBook), 1);

  return res.send(audioBook);
});

export default router;
