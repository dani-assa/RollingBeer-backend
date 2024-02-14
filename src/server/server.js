const express = require("express");
const app = express();
require("dotenv").config();
require("../dbConenection/dbConnection");
const port = parseInt(process.env.PORT) || 8000;
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const userRoutes = require("../routes/user.routes");

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`);
});
