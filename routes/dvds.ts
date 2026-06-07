import express from "express";
import { Category } from "./categories";

const router = express.Router();

interface Dvd {
  title: string;
  runTimeMinutes: number;
  type: "Dvd";
  isBorrowable: boolean;
  categoryId: Category;
}

const dvds: Dvd[] = [
  {
    title: "KPop Demon Hunters",
    runTimeMinutes: 95,
    type: "Dvd",
    isBorrowable: false,
    categoryId: { category: "Musikalier" },
  },
  {
    title: "The Martian",
    runTimeMinutes: 142,
    type: "Dvd",
    isBorrowable: true,
    categoryId: { category: "Science Fiction" },
  },
  {
    title: "Moulin Rouge!",
    runTimeMinutes: 127,
    type: "Dvd",
    isBorrowable: true,
    categoryId: { category: "Musikalier" },
  },
  {
    title: "How to Train Your Dragon",
    runTimeMinutes: 98,
    type: "Dvd",
    isBorrowable: true,
    categoryId: { category: "Fantasy" },
  },
  {
    title: "Gladiator",
    runTimeMinutes: 155,
    type: "Dvd",
    isBorrowable: true,
    categoryId: { category: "Action" },
  },
];

router.get("/", (req, res) => {
  return res.send(dvds);
});

router.get("/:titleRoute", (req, res) => {
  const dvd = dvds.find((d) => d.title === req.params.titleRoute);

  if (!dvd) return res.status(404).send("Kan inte hitta dvd:n");

  return res.send(dvd);
});

export default router;
