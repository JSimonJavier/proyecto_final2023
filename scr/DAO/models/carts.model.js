import { Schema, model } from "mongoose";

const cartSchema = new Schema({

    products:{    
        type: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "products",
                requiered: true
            },
            quantity:{type: Number,
                requiered: true,
                min: 0,
                default: 1
                },
            _id: false
        }],
        default: [],
        require: true
    }
});

/* cartSchema.pre("findById", function (){
    this.populate("products.products");
}); */

export const cartModel = model("carts", cartSchema);