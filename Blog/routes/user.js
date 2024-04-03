const { Router } = require("express");
const router = Router();
const User = require("../models/user.js");
const { default: mongoose } = require("mongoose");

router.get("/signup", (req, res) => {
    res.render("signup");
})
router.get("/signin", (req, res) => {
    res.render("signin");
})
router.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        await User.create({
            fullName,
            email,
            password,
        });
        res.redirect("/user/signin");
    }
    catch(error){
        console.log("Error occuring",error);
        res.send("error");
    }
});
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPassword(email, password);
        res.cookie("token", token.token);
        res.redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password",
        });
    }
});

router.get("/logout",async(req,res)=>{
    res.clearCookie("token").redirect("/");
})
module.exports = router;