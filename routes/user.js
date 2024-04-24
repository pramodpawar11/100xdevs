import express from "express";
import prisma from "../DB/db.config.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user with the given email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(400).json({ status: 400, msg: "Email already exists" });
        }

        // If user doesn't exist, create a new user
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        });

        // Return success response with the newly created user data
        return res.status(201).json({ status: 201, data: newUser, msg: "User successfully created" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: 500, msg: "Internal server error" });
    }
});

router.put("/:id",async(req,res)=>{
    const userId = req.params.id;
    const {name,email,password} = req.body;
   const newUser =  await prisma.user.update({
        where:{
            id:Number(userId),
        },
        data:{
            name:name,
            email:email
        }
    })
    res.json({status:200,newUser:newUser,msg:"updated successfully"})
})
router.get("/",async (req,res)=>{
    const allUser = await prisma.user.findMany({
        include:{
            post:true,
        },
    })
    res.json({msg:allUser});
})
router.delete("/:id",async (req,res)=>{
    const userId = req.params.id;
    await prisma.user.delete({
        where:{
            id:Number(userId),
        }  
    })
    res.json({msg:"user is deleted",userId:userId});
})

export default router;
