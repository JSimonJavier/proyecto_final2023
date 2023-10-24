import ProductsDAO from "../DAO/classes/producsDAO.model.js";
import UserDAO from "../DAO/classes/usersDAO.model.js";
import transport from "../utils/nodemailer.js";
const userDAO = new UserDAO();
const productsDAO = new ProductsDAO();


class ProductsService {

    async getAllProducts(limit, pages, sort, query,) {
        try{    
        const queryResults = await productsDAO.getAllProducts(limit, pages, sort, query)
        
        const {docs, ...rest} = queryResults;
        
        let products = docs.map(doc =>{
            return{
                _id: doc._id,
                title: doc.title,
                description: doc.description,
                price: doc.price,
                thumbnail: doc.thumbnail,
                code: doc.code,
                stock: doc.stock,
                category: doc.category,}
            })
        return {products, pagination: rest};
        }
        catch(err){
            return { code: 400, result: { status: "error", message: "Error getting products" } };
          }
          }

//-------------------------------------------------------------------------------------------

    async productCreation(newProduct, ownsProduct) {
    try{ 
      
        await productsDAO.productCreation(newProduct, ownsProduct)
        
        return newProduct;
    }
    catch(err){
        console.log(err);
        return { code: 400, result: { status: "error", message: "Error creating the product" } };
    }
}

//-------------------------------------------------------------------------------------------
async getProductByID(solicitedID) {

    try{
    const productFound = await productsDAO.getProductByID(solicitedID);

    return productFound;
    }
    catch{
        
        return { code: 400, result: { status: "error", message: "Error getting the product" } };
    }
    }
//-------------------------------------------------------------------------------------------

    async productsUpdate(solicitedID, newProduct) {
        try{

            const productUpdated = await productsDAO.productsUpdate(solicitedID, newProduct);
            
            return productUpdated;
        }
        catch{
            return {code: 400, result: {status: "error", massage: "Error updating the product"} };
        }
    }
    
    //-------------------------------------------------------------------------------------------
    async productDelete(solicitedID) {

        const product = await productsDAO.getProductByID(solicitedID);
        const productOwner = product.owner;
        const owner = await userDAO.findById(productOwner);   
        await productsDAO.productDelete(solicitedID);


        if (owner.role != "admin") {
            if (owner.role === "premium") {
                transport.sendMail({
                    from: "Ecommerce <javisimon22@gmail.com>",
                    to: owner.email,
                    subject: "product deleted",
                    html: `<p>The product ${product.title} has been deleted.</p>`,
                });
            }
        }
        return {
            code: 200,
            result: { status: "success", message: "Product deleted successfully", payload: product },
        };
        }
     catch(err){  

          return {code: 400, result: {status: "error", massage: "Error deleting the product"} };
        }   
    
}


export default ProductsService;