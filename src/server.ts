import express from "express";
import { architectRoutes } from "./routes/architect.routes";

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.json())

app.use("/architects", architectRoutes)

app.listen(3333, () => console.log("Server is running!"))