const express = require("express");
const app = express();
const URL = require("./Model/url.js");
const cookieParser = require("cookie-parser")


const path = require("path")
const bodyParser = require("body-parser");
const PORT = 8001;
const { connectToMongodb } = require("./connection");

const router = require("./Routes/url.js");
const staticRouter = require("./Routes/staticRouter.js");
const userRouter = require("./Routes/user.js");
const {restricTheUser,checkAuth} = require("./Middlewares/auth.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
connectToMongodb("mongodb://127.0.0.1:27017/url-sortner").then(() => console.log("Mongodb is connected"))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))


app.use("/url",restricTheUser, router);
app.use("/",checkAuth, staticRouter);
app.use("/user", userRouter);
app.listen(PORT, () => console.log("Server is running on", PORT));

