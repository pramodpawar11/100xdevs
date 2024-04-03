const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog.js");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads"));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
  
  const upload = multer({ storage: storage })

router.get("/",(req,res)=>{
   return res.render("blog",{
        user:req.user
    })
})

router.post("/add-blog", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;
    const {_id} = await req.user;
    console.log(_id);
    try {
        const blog = await Blog.create({
            title: title,
            body: body,
            createdBy: _id,
            coverImg: `/uploads/${req.file.filename}`,
        });
        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

router.get("/:id",async(req,res)=>{
  const findBlog = await Blog.findById(req.params.id).populate("createdBy");
  res.render("showBlogs",{
    user:req.user,
    showBlogs:findBlog,
  });

});

module.exports = router