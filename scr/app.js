import path from "path";
import express from "express"
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./config/config.js";
import handlebars from "express-handlebars";
import { connectMongo } from "./utils/mongo.js";
import { __dirname,  } from "./utils/dirname.js";
import { connectSocket } from "./utils/socket.js";
import { usersRouter } from "./routes/users.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { iniPassport } from "./config/passport.config.js";
import { sessionsRouter } from "./routes/session.router.js";
import { productsRouter }  from "./routes/products.router.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(session({
  store: MongoStore.create({mongoUrl: "mongodb+srv://javisimon22:dJrUwMt8jA9kgApw@data-base.shzhzce.mongodb.net/ecommerce?retryWrites=true&w=majority", ttl: 14400}),
  secret: "secreto",
  resave: true,
  saveUninitialized: true}))

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter)

app.use("/api/session", sessionsRouter)

const httpServer = app.listen(port, () => {
  console.log(`app listening from http://localhost:${port}/api/users/login`)
});

connectMongo(); 

connectSocket(httpServer);

app.get("/", (req, res)=>{

  res.redirect("/api/users/login")
})


app.get("*", (req, res)=>{

    res.status(404).json({
      status: "error",
      msg: "route does not exist",
      data: {},
    });
})