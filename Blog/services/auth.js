const jwt = require("jsonwebtoken");
const secret = "Pramod!!@@";

async function generateTokens(user){
    const payload = {
        _id:user._id,
        role:user.role,
        email:user.email,
        fullName:user.fullName,
        profilePictureUrl:user.profilePictureUrl,

    };
    const token = jwt.sign(payload, secret);
    return token;
}

async function verifyTokens(token){
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

module.exports = {
    generateTokens,
    verifyTokens,
};
