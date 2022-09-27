import express from "express";
import "express-async-errors";
import cors from "cors";
import routers from "./routers";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

app.use(errorMiddleware);

export default app;
