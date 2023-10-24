import express from "express";
import passport from "passport";
import { adminCheck, validUser } from "../middleware/userAuntentification.js";
import UserController from "../controllers/users.controllers.js";
const usersRouter = express.Router();
const userController = new UserController()

usersRouter.get("/login", userController.login)
usersRouter.post("/login",passport.authenticate('login', { failureRedirect: '/api/users/faillogin' }), userController.userLogin)
usersRouter.get('/faillogin', userController.failLogin);
usersRouter.get("/logout", userController.logout)
usersRouter.get("/register", userController.register)
usersRouter.post("/register", passport.authenticate('register', { failureRedirect: '/api/users/failregister' }), userController.userRegister)
usersRouter.get('/failregister', userController.failregister);
usersRouter.get("/profile", validUser, userController.profile)
usersRouter.get("/admpanel", adminCheck, userController.admpanel)
usersRouter.get("/", validUser, userController.getAllUsers)
usersRouter.delete("/", userController.innactiveUsers)
usersRouter.put("/update/:uid", userController.updateToPremium)
usersRouter.delete("/delete/:uid", userController.deleteUser) 


export { usersRouter };