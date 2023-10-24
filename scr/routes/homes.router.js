import express from "express"
import ProductsService from "../services/products.service.js";
const homesRouter = express.Router();
const homeService = new ProductsService();


homesRouter.get("/", async (req, res) => {
  try{
  const limit = req.query.limit;
   
  const products = await homeService.gatCartById();
  
  if(limit){
    return res.status(200).json({
    status: "success",
    msg: "Product List",
    data: (products.slice(0, limit))
    });
  }else{
    return res.status(200).json({
    status: "success",
    msg: "Product List",
    data: products,
    });
  }
}
catch(err){

  return  res.status(404).json({
    status: "error",
    msg: "Product List does not exist",
    data: {},
  });
}
});

export {homesRouter}