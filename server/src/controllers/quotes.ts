import mongoose from "mongoose";
import axios from "axios";
import Quotes from "../models/quote";
import { Request, Response } from "express";

export const generateQuotes = async (req: Request, res: Response) => {
  axios
    .get("https://zenquotes.io?api=quotes")
    .then((response) => {
      res.status(200).json({ quotes: response.data });
    })
    .catch((err) => res.status(503).json({ message: err.message }));
};

export const getQuotes = async (req: Request, res: Response) => {
  try {
    const LIMIT: number = Number(req.query.limit);

    const quotes = await Quotes.find().limit(LIMIT);

    res.status(200).json({ data: quotes });
  } catch (err: any) {
    res.status(406).json({ message: err.message });
  }
};

export const getRandomQuote = async (req: Request, res: Response) => {
  try {
    const total: number = await Quotes.countDocuments({});
    const random: number = Math.floor(Math.random() * total);
    const randomQuote: any = await Quotes.find().limit(1).skip(random);

    res.status(200).json({ data: randomQuote });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
