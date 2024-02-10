import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./route/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
// Middleware for handling CORS Policy
// Opt 1, Allow all origins with default of CORS(*)
app.use(cors());
// Opt 2, Allow custom origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use("/books", booksRoute);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log(`App is connected to database`);
    app.listen(PORT, () => {
      console.log(`App is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
