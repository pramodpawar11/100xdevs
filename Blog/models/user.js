const { Schema, model } = require("mongoose");
const {createHmac,randomBytes} = require("crypto");
const {generateTokens} = require("../services/auth.js");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        
    },
    password: {
        type: String,
        required: true,
    },
    profilePictureUrl: {
        type: String,
        default: "/images/blogfile.webp"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
});

userSchema.pre("save",function (next){
    const user = this;
    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashPassword = createHmac("sha256",salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashPassword;
    next();
});

userSchema.static("matchPassword",async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found");
    const salt = user.salt;
    const hashedPassword = user.password;
    const userGivePaasword = createHmac("sha256",salt).update(password).digest("hex");
    if(hashedPassword!==userGivePaasword) throw new Error("Incorrect password");
    const token = await generateTokens(user);
    return {token};
})

const User = model("user",userSchema);

module.exports = User;
