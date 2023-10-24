import { Error } from "mongoose";
import { cartModel } from "../DAO/models/carts.model.js";
import ProductsService from "../services/products.service.js";
import { ProductModel } from "../DAO/models/products.model.js";
import CartsDAO from "../DAO/classes/cartsDAO.model.js";
const productService = new ProductsService();

const cartsDAO = new CartsDAO();


class CartsService {
    
    async cartsCreation(){
        try{
          const newCreation = cartsDAO.cartsCreation();
          return newCreation;
           }
        catch{
          return { code: 400, result: { status: "error", message: "Error creating the cart" } }; 
        }
    }

//-------------------------------------------------------------------------------------------

    async getCartByID(solicitedID){
        try{
            const cart = await cartsDAO.getCartByID(solicitedID)

            return cart;
        }
        catch{
            return {code: 400, result: {status:"error", massage: "Cart does not exist"}};
        }
    }
//-------------------------------------------------------------------------------------------

    async addProductToCart(solicitedCartID, solicitedProductID){
        try{
            const productAdded = await cartsDAO.addProductToCart(solicitedCartID, solicitedProductID);

            return productAdded;
        }
        catch(err){
            console.log(err)
            return {code: 400, result: {status: "error", massage: "Cant add the product"}};
        }
    }
//-------------------------------------------------------------------------------------------

    async removeProductFromCart(solicitedCartID, solicitedProductID){
        try{
            const productRemoved = await cartsDAO.removeProductFromCart(solicitedCartID, solicitedProductID)

            return productRemoved;
        }
        catch{
            return {code: 400, result: {status: "error", massage: "Cant remove the product"}};
        }
    }
    //-------------------------------------------------------------------------------------------
    
    async modifyCart(solicitedCartID, toBeModify){   
        try{
            
            const cartModified = await cartsDAO.modifyCart(solicitedCartID, toBeModify)
            return cartModified;
        }
        catch{
            
            return {code: 400, result: {status: "error", massage: "Cant modify the cart"}};
        }
        
    }
    //-------------------------------------------------------------------------------------------
    
    async modifyQuantity(solicitedCartID, solicitedProductID, solicitedQuantity){
        try{
            
            const updateCart = await cartsDAO.modifyQuantity(solicitedCartID, solicitedProductID, solicitedQuantity)
            return updateCart;
        }
        catch{

            return {code: 400, result: {status: "error", massage: "Cant modify the cart"}};
        }
        
}
//-------------------------------------------------------------------------------------------

async deleteAllProducts(solicitedCartID){
    try{
        const updateCart = await cartsDAO.deleteAllProducts(solicitedCartID);
        return updateCart;
    }
    catch(err){
        console.log(err)
        return {code: 400, result: {status: "error", massage: "Cant modify the cart"}};
    }
} 
}

export default CartsService;
