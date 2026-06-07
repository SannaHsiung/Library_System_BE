import express from "express";
import categories from "./routes/categories";
import books from "./routes/books";
import dvds from "./routes/dvds";
import audioBooks from "./routes/audioBooks";
import referenceBooks from "./routes/referenceBooks";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/categories", categories);
app.use("/api/books", books);
app.use("/api/dvds", dvds);
app.use("/api/audioBooks", audioBooks);
app.use("/api/referenceBooks", referenceBooks);

const PORT = process.env.PORT || 584;

app.listen(PORT, () => console.log("Listening on port " + PORT));
