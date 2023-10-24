import ProductsService from "../services/products.service.js"
const productService = new ProductsService();

class ProductsController{

    async getAllProducts(req, res) {
      const limit = req.query.limit
      const pages = req.query.page
      const sort = req.query.sort
      const query = req.query.query
      const user = req.session.user
  
      const {products, pagination} = await productService.getAllProducts(limit, pages, sort, query);

      let isAdm = false;
      
      if(user.role != "user"){
        isAdm = true;
      }     
      return res.status(200).render("products", {user, products, pagination, isAdm});

  }
//-------------------------------------------------------------------------------------------

  async productCreation(req, res){

    const newProduct =  req.body;
    const ownsProduct = req.session?.user?._id;

    const productAdded = await productService.productCreation(newProduct, ownsProduct);
   
    return res.status(201).json({
      data: productAdded,
    });
  }
  //-------------------------------------------------------------------------------------------

  async getProductByID(req, res){

        const solicitedID = req.params.pid; 
      
        const productFound = await productService.getProductByID(solicitedID);
      
          return res.status(201).json({
          data: productFound,
          });  
      }
  
//-------------------------------------------------------------------------------------------
    async productsUpdate(req, res){
    const solicitedID = req.params.pid; 
    const newProduct =  req.body;

    const toBeUpdated = await productService.productsUpdate(solicitedID, newProduct);
      
      return res.status(201).json({
        data: toBeUpdated
      })
    }
  
//-------------------------------------------------------------------------------------------

async productDelete(req, res){

    const solicitedID = req.params.pid; 
    
    const productFound = await productService.productDelete(solicitedID);
    
    return res.status(200).json({
      data: productFound
    });
  }
 }

export default ProductsController;