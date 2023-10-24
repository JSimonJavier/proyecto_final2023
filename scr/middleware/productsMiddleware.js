import { ProductModel } from "../DAO/models/products.model.js";


export const productsValidation = async (req, res, next) => {
        const product = req.body
    if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock ||
        !product.category) {

        return res.status(403).send("something is missing")
    }
    else{
        
        return next()
    }
}
//-------------------------------------------------------------------------------------------

export const productExist = async (req, res, next) => {

    const solicitedID = req.params.pid; 
    const newProduct =  req.body;

    ProductModel.findById(solicitedID);

    if (!solicitedID) {
        return res.status(403).send("product do not exist")
    }

    if (newProduct._id) {
        return res.status(406).send("Product's ID cant be updated");
    }

    return next();
}
