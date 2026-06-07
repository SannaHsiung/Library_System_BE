import express from "express";
import { Category } from "./categories";
import { validateArticle } from "../schemas/Article";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export interface Dvd {
  id: string;
  title: string;
  runTimeMinutes: number;
  type: "Dvd";
  isBorrowable: boolean;
  categoryId: Category;
}

const dvds: Dvd[] = [
  {
    id: "101",
    title: "KPop Demon Hunters",
    runTimeMinutes: 95,
    type: "Dvd",
    isBorrowable: false,
    categoryId: {
      id: "1005",
      name: "Musikalier",
    },
  },
  {
    id: "102",
    title: "The Martian",
    runTimeMinutes: 142,
    type: "Dvd",
    isBorrowable: true,
    categoryId: {
      id: "1006",
      name: "Science Fiction",
    },
  },
];

router.get("/", async (req, res) => {
  const dvds = await prisma.dvd.findMany();
  return res.send(dvds);
});

router.get("/:id", async (req, res) => {
  const dvd = await prisma.dvd.findFirst({
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

  const newDvd = await prisma.dvd.create({
    data: {
      title: req.body.title,
      runTimeMinutes: req.body.runTimeMinutes,
      type: req.body.type,
      isBorrowable: req.body.isBorrowable,
      categoryId: req.body.categoryId,
    },
  });

  return res.status(201).send(newDvd);
});
*/

/*
router.put("/:id", async (req, res) => {
  const dvd = await prisma.dvd.findFirst({
    where: { id: req.params.id },
  });

  if (!dvd) return res.status(404).send("Kan inte hitta ljudboken");

  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  const updatedDvd = await prisma.dvd.update({
    where: { id: req.params.id },
    data: {
      title: req.body.title,
      runTimeMinutes: req.body.runTimeMinutes,
      type: req.body.type,
      isBorrowable: req.body.isBorrowable,
      categoryId: req.body.categoryId,
    },
  });

  return res.send(updatedDvd);
});
*/

router.delete("/:id", async (req, res) => {
  const dvd = await prisma.dvd.findFirst({
    where: { id: req.params.id },
  });

  if (!dvd) return res.status(404).send("Kan inte hitta kategorien");

  const deletedDvd = await prisma.dvd.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedDvd);
});
export default router;
