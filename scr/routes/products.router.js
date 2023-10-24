import express from "express"
import { adminCheck, validUser } from "../middleware/userAuntentification.js";
import ProductsController  from "../controllers/products.controllers.js";
import { productsValidation, productExist } from "../middleware/productsMiddleware.js";

const productController = new ProductsController()
const productsRouter = express.Router();

productsRouter.get("/", validUser, productController.getAllProducts);
productsRouter.get("/:pid", productController.getProductByID)
productsRouter.put("/:pid",productExist , productController.productsUpdate)
productsRouter.post("/",productsValidation, productController.productCreation);
productsRouter.delete("/:pid", productController.productDelete)

export {productsRouter};