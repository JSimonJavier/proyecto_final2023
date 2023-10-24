import { Schema, model } from "mongoose";


const orderSchema = new Schema(
  {
    code: { type: String, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },

  },
  { versionKey: false }
);

export const TicketModel = model("orders", orderSchema);