import express from "express";

import { generateQuotes, getQuotes, getRandomQuote } from "../controllers/quotes";

const router = express.Router();

router.get("/generate", generateQuotes);
router.get("/", getQuotes);
router.get("/random-quote", getRandomQuote);

export default router;
