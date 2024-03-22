const jwt = require("jsonwebtoken");
const secret = "pramod!!@!!"

async function setUser(user){
    const payload = {
        _id:user._id,
        email:user.email,
    }
    return jwt.sign(payload,secret)
}

async function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret)

    }
    catch(error){
        return console.log("Error",error);
    }
}

module.exports = {
    setUser,
    getUser
}
