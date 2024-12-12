import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

//Get directory location dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

////Middlewares
app.use(express.json());
//Serve static files from "/public" folder
app.use(express.static(path.join(__dirname, "../public")));

//Routes
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

////Endpoints
app.get("/", (req, res) => {
  const correctPath = path.join(__dirname, "public", "index.html");
  res.sendFile(correctPath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening on port:", PORT));
