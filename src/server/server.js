import  express from "express";
const app = express();
import  dotenv  from 'dotenv';
import '../dbConenection/dbConnection.js'
const port = parseInt(process.env.PORT) || 8000;
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

import userRoutes from "../routes/user.routes.js";

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`);
});
