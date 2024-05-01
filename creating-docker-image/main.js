const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  return res.json({ msg: "welcome from the container" });
});
app.listen(PORT, () => console.log("PORT IS RUNNING ON " + PORT));
