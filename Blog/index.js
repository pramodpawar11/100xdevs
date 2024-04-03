const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/user.js");
const { connectToDb } = require("./connection.js");
const blogRouter = require("./routes/blog.js");
const Blog = require("./models/blog.js");
var cookieParser = require("cookie-parser");
const { checkAuthentication } = require("./middlewares/authentications.js");

connectToDb("").then(() => {
  console.log("Connected to Database");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication("token")); // Correct
// app.use(express.static("./public"))
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const allblogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render("home", {
    user: req.user,
    blogs: allblogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log("PORT is running on ", PORT));
