const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const cookieParser = require("cookie-parser")

const bodyParser = require("body-parser");

const todoList = require("./Routes/todolists");
const staticRouter = require("./Routes/static-router");
const { connecttoMongoose } = require("./connection");
const userRouter = require("./Routes/user");
const {restricTheUser,checkAuth} = require("./Middleware/auth")

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connecttoMongoose("")
  .then(() => console.log("Db is connected"))
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if there's an error connecting to the database
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/",checkAuth,staticRouter);
app.use("/todo",restricTheUser, todoList);
app.use("/user",userRouter);

app.listen(port, () => console.log("Port is running", port));
