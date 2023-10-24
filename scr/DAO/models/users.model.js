import { Schema, model } from "mongoose";


const usersSchema = new Schema({

    firstName: {type: String, requiered: true, max: 25},
    lastName: {type: String, requiered: true, max: 25},
    email: {type: String, requiered: true, unique: true, max: 100},
    password: {type: String, requiered: true, max: 20},
    role: {type: String, required: true, default: "user",},
    cartId: { type: Schema.Types.ObjectId, ref: "carts", required: true, unique: true },
    lastConection: {type: Date, default: Date.now()},
    
});

export const UserModel = model("users", usersSchema)