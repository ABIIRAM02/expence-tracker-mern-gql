import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const transactionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["card", "online", "cash"],
    required: true,
  },
  category: {
    type: String,
    enum: ["saving", "investment", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
