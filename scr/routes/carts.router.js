import express from "express";
import CartController from "../controllers/carts.controllers.js";
const cartController = new CartController();
const cartsRouter = express.Router();


cartsRouter.post("/", cartController.cartsCreation)

cartsRouter.get("/:cid", cartController.getCartByID)

cartsRouter.put("/:cid/product/:pid", cartController.addProductToCart);

cartsRouter.delete("/:cid/product/:pid", cartController.removeProductFromCart)

cartsRouter.put("/:cid", cartController.modifyCart)

cartsRouter.put("/:cid/products/:pid", cartController.modifyQuantity);

cartsRouter.delete("/:cid", cartController.deleteAllProducts) 

cartsRouter.post("/:cid/purchase", cartController.purchase)

cartsRouter.get("/:cid/purchase", cartController.purchase)

export { cartsRouter };