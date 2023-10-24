import { Server } from "socket.io";
import ProductsService from "../services/products.service.js";
import CartService from "../services/carts.service.js";


export function connectSocket(httpServer) {

    const socketServer = new Server(httpServer);

    const product = new ProductsService(); 
    const cart = new CartService();

    socketServer.on("connection", (socket) => {
        console.log("socket conected to " + socket.id);

        socket.on("new_product", async (data) => {
            try {
                let getProducts = await product.getProducts()

                let checkcode = getProducts.find(e => e.code === data.code)

                if (checkcode) {
                    socketServer.emit("error", { msg: "code Allredy Exist" });
                }

                await product.addProduct({ ...data });
                getProducts = await product.getProducts()
                socketServer.emit("all_products", getProducts);
            }
            catch (err) {
                console.log("error");
            }
        });


        socket.on("delete_product", async (data) => {
            try {
                const id = parseInt(data);
                await product.deleteProduct(id);

                const getProduct = await product.getProducts();
                socketServer.emit("all_products", getProduct);
            }
            catch (err) {
                console.log("error");
            }
        })

    });
}