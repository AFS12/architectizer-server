import express from "express";
import { architectRoutes } from "./routes/architect.routes";

const app = express();

app.use(express.json())

app.use("/categories", architectRoutes)

app.listen(3333, () => console.log("Server is running!"))