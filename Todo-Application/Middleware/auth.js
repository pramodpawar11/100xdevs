const {getUser} = require("../services/auth");

async function restricTheUser(req,res,next){
    const userSessionId = req.cookies?.jwt;
    if(!userSessionId) return res.redirect("/login");
    const user =await getUser(userSessionId);
    if(!user) return res.redirect("/login");
    req.user = user;
    next();
}
async function checkAuth(req,res,next){
    const userSessionId = req.cookies?.jwt; 
    const user =await getUser(userSessionId);
    req.user = user;
    next();
}

module.exports = {
    restricTheUser,
    checkAuth,
}