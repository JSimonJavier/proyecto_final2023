import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      
      "mongodb+srv://javisimon22:dJrUwMt8jA9kgApw@data-base.shzhzce.mongodb.net/ecommerce?retryWrites=true&w=majority"
      );
      console.log("conected to mongo");
    }
    catch(e){
      console.log(e);
      throw "Can not conect to DB";
    }
  } 