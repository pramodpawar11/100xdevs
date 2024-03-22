const LIST = require("../Models/todolist");
const USER = require("../Models/user");
const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const { setUser } = require("../services/auth");

router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        await USER.create({
            firstName,
            lastName,
            email,
            password,
        });
        res.redirect("/login");
    }
    catch (error) {
        console.log("Error is occured", error);
        res.json({ msg: "Error occured" });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await USER.findOne({ email: email, password: password });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const token = await setUser(user);

        res.cookie("jwt", token);

        return res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

