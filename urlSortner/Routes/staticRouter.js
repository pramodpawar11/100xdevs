const express = require("express");
const router = express.Router();
const URL = require("../Model/url")

router.get("/",async (req,res)=>{
    if(!req.user) return res.redirect("/login")
    const allUrls = await URL.find({createdBy:req.user._id});
    return res.render("main",{
        urls:allUrls,
    })
})
router.get("/signup",async (req,res)=>{
    res.render("signup");
})
router.get("/login",async (req,res)=>{
    res.render("login");
})
module.exports = router;