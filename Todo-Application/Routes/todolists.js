const express = require("express");
const LIST = require("../Models/todolist.js");
const router = express.Router();

router.post("/addtodo", async (req, res) => {
    try {
        const { title } = req.body;
        await LIST.create({ title: title,createdBy:req.user._id });
        res.redirect("/");
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).send("Error adding todo: " + error.message);
    }
});

router.get("/showtodo", async (req, res) => {
    try {
        const allLists = await LIST.find({});
        res.send(allLists);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).send("Error fetching todos: " + error.message);
    }
});

router.post("/deletetodo/",async(req,res)=>{
    const id = req.body.id;

  try {
    await LIST.findByIdAndDelete(id);
    res.redirect("/"); 
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.sendStatus(500); 
  }
})
router.post("/updatetodo", async (req, res) => {
    const id = req.body.editId;
    try {
        await LIST.findByIdAndUpdate(id, {title:req.body.title},{new:true});
        
        res.redirect("/");
    } catch (error) {
        console.log("Error in updating", error);
        res.sendStatus(500);
    }
});


module.exports = router;
