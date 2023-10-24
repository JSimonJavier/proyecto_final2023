import { cartModel } from "../models/carts.model.js";
import ProductsDAO from "./producsDAO.model.js";
const productDAO = new ProductsDAO();

class CartsDAO {
    async cartsCreation(){
        const newCart = await cartModel.create({});

        return newCart; 
    }
//-------------------------------------------------------------------------------------------

async getCartByID(solicitedID){
    const cartFound = await cartModel.findById(solicitedID).lean().populate("products.productId")
    
    if(!cartFound){
        throw new Error("Cart not exist");
    }
    
    return cartFound;
}
//-------------------------------------------------------------------------------------------
async addProductToCart(solicitedCartID, solicitedProductID){
    
    const cartFound = await cartModel.findById({_id: solicitedCartID});
    
    if(!cartFound){
        throw new Error("Cart not found");
    }
    
    const productFound = await productDAO.getProductByID({_id: solicitedProductID});
    
    if(!productFound){
        throw new Error("Product not found");
    }
    
    const index = cartFound.products.findIndex(prod => prod.productId._id.toString() === solicitedProductID);
    
    if(index === -1){
        cartFound.products.push({productId: productFound._id})
        return await cartFound.save();
    }
    
    
    cartFound.products[index].quantity +=1;
    return await cartFound.save();
}

//-------------------------------------------------------------------------------------------
async removeProductFromCart(solicitedCartID, solicitedProductID){
    const cartFound = await cartModel.findOne({_id: solicitedCartID});
    
    if(!cartFound){
        throw new Error("Cart not found");
    }
    
    const index = cartFound.products.findIndex(products => products.productId._id.toString() === solicitedProductID);
    
    if(index == -1){
        
        throw new Error("product not found");
    }
    else{
        cartFound.products.splice(index, 1)
        const updateCart = await cartModel.updateOne({_id: solicitedCartID}, cartFound);
        return updateCart;
    }
    
    
}
//-------------------------------------------------------------------------------------------

async modifyCart(solicitedCartID, toBeModify){
    const cartFound = await cartModel.findByIdAndUpdate(solicitedCartID, {$unset: {productId: 1}}, {new: true})
    
    if(!cartFound){
        throw new Error("Cart not found");
    }
    
    let cartAux = toBeModify;
    
    const updateCart = await cartModel.updateOne({_id: solicitedCartID}, cartAux);
    return updateCart;
}
//-------------------------------------------------------------------------------------------

async modifyQuantity(solicitedCartID, solicitedProductID, solicitedQuantity){
    const cartFound = await cartModel.findOne({_id: solicitedCartID}).populate("products.productId");
    
    let prodCart = cartFound.products.find((item)=> item.productId._id.toString() === solicitedProductID)
    
    prodCart.quantity = prodCart.quantity + solicitedQuantity;
    
    const updateCart = await cartModel.updateOne({_id: solicitedCartID}, cartFound);
    
    return updateCart;
}
//-------------------------------------------------------------------------------------------
async deleteAllProducts(solicitedCartID){
    
    const cartFound = await cartModel.findOne({_id: solicitedCartID})

    cartFound.products = []

    const updateCart = await cartModel.updateOne({_id: solicitedCartID}, cartFound);
    return updateCart;
}

}

export default CartsDAO;