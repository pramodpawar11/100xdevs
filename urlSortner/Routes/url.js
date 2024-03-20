const express = require("express");
const router = express.Router();
const URL = require("../Model/url.js");
const shortid = require("shortid");

router.post("/",async (req,res)=>{
    const body = req.body
    if(!body.url) return res.status(400).json({msg:"require Url"});
    const ShortId = shortid.generate(); 
    await URL.create({
        sortId:ShortId,
        redirectId:body.url,
        visit:[],
        createdBy:req.user._id  
    })
    res.render("main",{
        id:ShortId,
    });
})

router.get("/:sortid",async (req,res)=>{
    const sortid = req.params.sortid;
    const entry = await URL.findOneAndUpdate({
        sortId:sortid,
    },{
        $push:{
            visits:{
                timestamps:Date.now(),
            },
        },
    })
    if (!entry || !entry.redirectId) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectId);
})



module.exports = router