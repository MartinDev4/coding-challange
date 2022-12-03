import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
});

const Quotes = mongoose.model("Quotes", quoteSchema);

export default Quotes;
