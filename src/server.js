import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const correctPath = path.join(__dirname, "public", "index.html");

app.get("/", (req, res) => {
  res.sendFile(correctPath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening on port:", PORT));
