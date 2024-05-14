import express from "express";
const app = express();
import dotenv from 'dotenv';
import '../dbConenection/dbConnection.js'
export const port = process.env.PORT || 8000;
export const ADMIN_KEY = process.env.ADMIN_KEY;
export const USER_KEY = process.env.USER_KEY;
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from "../routes/user.routes.js";
import productRoutes from "../routes/product.routes.js";
// import { createPreference } from '../controllers/mercadopago.js';

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: 'https://main--rollingbeer1.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    withCredentials: true,
  })
);

app.use(cookieParser());

// app.post("/create_preference", async (req, res) => {
//   try {
//     const items = req.body.items.map(item => ({
//       title: item.title,
//       quantity: item.quantity,
//       unit_price: item.unit_price,
//       currency_id: item.currency_id,
//     }));
//     const back_urls = req.body.back_urls;
//     const auto_return = req.body.auto_return;

//     const preferenceId = await createPreference({ items, back_urls, auto_return });
//     res.json({ id: preferenceId });
//   } catch (error) {
//     console.error('Error creating preference:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`);
});
