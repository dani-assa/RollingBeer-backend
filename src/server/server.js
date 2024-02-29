import  express from "express";
const app = express();
import  dotenv  from 'dotenv';
import '../dbConenection/dbConnection.js'
export const port = parseInt(process.env.PORT) || 8000;
export const ADMIN_KEY = process.env.ADMIN_KEY;
export const USER_KEY = process.env.USER_KEY;
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from "../routes/user.routes.js";
import productRoutes from "../routes/product.routes.js";

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    withCredentials: true,
  })
);
app.use(cookieParser());



app.use("/api/user", userRoutes);
app.use(productRoutes);

app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`);
});
