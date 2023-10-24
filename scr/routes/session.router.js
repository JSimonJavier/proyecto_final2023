import express  from "express";
import passport from "passport";
import transport from "../utils/nodemailer.js";
export const sessionsRouter = express.Router();


sessionsRouter.get("/github", passport.authenticate("github", { scope: ["eser: email"]}));

sessionsRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/users/login"}), (req, res)=>{
    req.session.user = req.user;
    res.redirect("/api/products")
})

sessionsRouter.get("/show", (req, res)=> {
    return res.send(JSON.stringify(req.session))
})


sessionsRouter.get("/show/cart", (req, res)=> {
    if (req.session.user) {
        return res.status(200).json({ status: "success", message: "Cart found", payload: req.session.user.cartId });
      } else {
        return res.status(400).json({ status: "error", message: "Cart not found" });
      }
})
