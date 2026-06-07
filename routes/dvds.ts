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

//håller på att fixa
//nedan ska fixas

router.post("/", (req, res) => {
  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0]?.message);

  const dvd: Dvd = {
    id: Date.now().toString(),
    title: req.body.title,
    runTimeMinutes: req.body.runTimeMinutes,
    type: req.body.type,
    isBorrowable: true,
    categoryId: req.body.categoryId.category,
  };

  dvds.push(dvd);

  return res.status(201).send(dvd);
});

router.put("/:id", (req, res) => {
  const dvd = dvds.find((d) => d.title === req.params.id);

  if (!dvd) return res.status(404).send("Kan inte hitta dvd:n");

  const validation = validateArticle(req.body);

  if (!validation.success)
    return res.status(404).send(validation.error.issues[0]?.message);

  dvd.title = req.body.title;
  dvd.runTimeMinutes = req.body.runTimeMinutes;
  dvd.type = req.body.type;
  dvd.isBorrowable = true;
  dvd.categoryId = req.body.categoryId.category;

  return res.send(dvd);
});

router.delete("/:id", (req, res) => {
  const dvd = dvds.find((d) => d.title === req.params.id);

  if (!dvd) return res.status(404).send("Kan inte hitta dvd:n");

  dvds.splice(dvds.indexOf(dvd), 1);

  return res.send(dvd);
});

export default router;
