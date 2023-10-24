import { ProductModel } from "../models/products.model.js";


class ProductsDAO{

    async getAllProducts(limit, pages, sort, query) {

        const filter = query? { title: { $regex: query.prod, $options: "i" } }: {};
        
        const queryResults = await ProductModel.paginate(filter, {
            limit: limit || 3,
            page: pages || 1,
            sort: sort || {}, 
            lean: true,
        });  
        
        return queryResults;
    }
//-------------------------------------------------------------------------------------------

    async productCreation(newProduct, ownsProduct){

        const productAdded = await ProductModel.create({...newProduct});



        productAdded.owner = ownsProduct;

        return productAdded;
    }
//-------------------------------------------------------------------------------------------

    async getProductByID(solicitedID){

    const productFound = ProductModel.findById(solicitedID);

    if (!productFound) {
        throw new Error("Product do not exist");
    }

    return productFound;
    }
//-------------------------------------------------------------------------------------------
async productsUpdate(solicitedID, newProduct){
    
    const productUpdated = await ProductModel.updateOne({ _id: solicitedID },  newProduct );
    
    return productUpdated;
}
//-------------------------------------------------------------------------------------------

async productDelete(solicitedID){

    const product = await ProductModel.findByIdAndDelete(solicitedID);

    return product;
}
}

export default ProductsDAO;