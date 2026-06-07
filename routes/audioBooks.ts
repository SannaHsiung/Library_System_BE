import express from "express";
import { PrismaClient } from "@prisma/client";
// import { validateArticle } from "../schemas/Article";

const router = express.Router();
const prisma = new PrismaClient();

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

  const newAudioBook = await prisma.audioBook.create({
    data: {
      title: req.body.title,
      runTimeMinutes: req.body.runTimeMinutes,
      type: req.body.type,
      isBorrowable: req.body.isBorrowable,
      categoryId: req.body.categoryId,
    },
  });

  return res.status(201).send(newAudioBook);
});
*/

/*
router.put("/:id", async (req, res) => {
  const audioBook = await prisma.audioBook.findFirst({
    where: { id: req.params.id },
  });

  if (!audioBook) return res.status(404).send("Kan inte hitta ljudboken");

  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  const updatedAudioBook = await prisma.audioBook.update({
    where: { id: req.params.id },
    data: {
      title: req.body.title,
      runTimeMinutes: req.body.runTimeMinutes,
      type: req.body.type,
      isBorrowable: req.body.isBorrowable,
      categoryId: req.body.categoryId,
    },
  });

  return res.send(updatedAudioBook);
});
*/

router.delete("/:id", async (req, res) => {
  const audioBook = await prisma.audioBook.findFirst({
    where: { id: req.params.id },
  });

  if (!audioBook) return res.status(404).send("Kan inte hitta kategorien");

  const deletedAudioBook = await prisma.audioBook.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedAudioBook);
});
export default router;
