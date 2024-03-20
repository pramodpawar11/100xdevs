const {getUser} = require("../services/auth.js");
async function restricTheUser(req,res,next){
    const userCookie = req.cookies?.uid;
    if(!userCookie) return res.redirect("/login");
    const user = getUser(userCookie);
    if(!user) return res.redirect("/login");
    req.user = user;
    next();
}
async function checkAuth(req,res,next){
    const userCookie = req.cookies?.uid;
    const user = getUser(userCookie);
    req.user = user;
    next();
}
module.exports = {
    restricTheUser,
    checkAuth,
}