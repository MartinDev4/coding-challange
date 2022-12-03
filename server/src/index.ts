import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";

import Quotes from "./models/quote";
import quoteRoutes from "./routes/quotes";

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.get("/", (req: Request, res: Response): void => {
//   res.json({ message: "Hello there" });
// });

app.use("/quotes", quoteRoutes);

mongoose
  .connect("mongodb+srv://MartinDev:z915emPWg0LATRSn@cluster0.9k9qjid.mongodb.net/test")
  .then((): void => {
    app.listen(5000, (): void => console.log(`Server running on port 5000`));
    let quotes = [];
    axios
      .get("https://zenquotes.io?api=quotes")
      .then((response): void => {
        quotes = response.data;
        quotes.forEach(async (quote: any) => {
          await Quotes.updateOne(
            { author: quote.a, quote: quote.q },
            { author: quote.a, quote: quote.q },
            { upsert: true }
          );
        });
      })
      .catch((err): void => console.log("Couldn't fetch posts"));
  })
  .catch((err: any): void => console.log(err.message));
