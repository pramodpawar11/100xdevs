const express = require("express");
const router = express.Router();
const LIST = require("../Models/todolist")
router.get("/",async (req,res)=>{
    if(!req.user) return res.redirect("/login");
    const userData = await LIST.find({createdBy:req.user._id});
    res.render("home",{
        userTodo:userData,
    });
})

router.get("/login",async (req,res)=>{
    res.render("login");
})
router.get("/signup",(req,res)=>{
    res.render("signup")
})

module.exports = router

