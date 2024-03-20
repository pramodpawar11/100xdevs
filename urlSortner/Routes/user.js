const express = require("express");
const router = express.Router();
const USER = require("../Model/users");
const {v4:uuidv4} = require("uuid");
const {setUser, getUser} = require("../services/auth.js");

router.post("/signup", async (req, res) => {
    const body = req.body;
    if (!body) return res.json({ msg: "Fill the details" });
    await USER.create({
        names: body.names,
        email: body.email,
        password: body.password
    })
    res.redirect("/");
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userData = await USER.findOne({ email, password });
    if (!userData) return res.render("login");
    const sessionId = uuidv4();
    setUser(sessionId,userData);
    res.cookie("uid",sessionId);
    return res.redirect("/");
})
module.exports = router;