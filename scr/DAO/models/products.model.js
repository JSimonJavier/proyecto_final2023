import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const producsSchema = new Schema({

    title:{type: String, requiered: true, max: 100},
    description:{type: String, requiered: true, max: 100},
    price:{type: Number, requiered: true, max: 200000},
    thumbnail:{type: String, requiered: true, max: 100},
    code:{type: String, requiered: true, max: 100, unique: true},
    stock:{type: Number, requiered: true, max: 20},
    category:{type: String, requiered: true, max: 100},
    owner: { type: Schema.Types.ObjectId, ref: "users", required: true},

});

producsSchema.plugin(mongoosePaginate);
producsSchema.index({ title: "text" })
export const ProductModel = model("products", producsSchema);