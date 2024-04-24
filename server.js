// require("dotenv").config();
import express from "express";
const app = express();
const PORT = process.env.PORT || 3001;
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

import bodyParser from "body-parser";

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/user", userRouter); 
app.use("/api/post", postRouter);

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
