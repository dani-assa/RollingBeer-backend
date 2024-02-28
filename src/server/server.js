import express from "express";
import dotenv from "dotenv";
import "../dbConnection/dbConnection.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "../routes/user.routes";

const app = express();
dotenv.config();


const port = parseInt(process.env.PORT) || 8000;

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`);
});
