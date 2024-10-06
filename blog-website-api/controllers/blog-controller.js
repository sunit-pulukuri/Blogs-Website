const Blog = require("../models/blog");

exports.createBlog = async (req, res) => {
  const { title, image, matter, author } = req.body;

  try {
    const newBlog = await Blog.create({
      title,
      image,
      matter,
      author,
      createdBy: req.user.id,
    });

    res.status(201).json(newBlog);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Could not retrieve all blogs" }, e.message);
  }
};

exports.myBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user.id });
    res.status(200).json({ message: blogs });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.blog_by_id = async (req,res) =>{
  const {id} = req.params;
  try{
    const blog = await Blog.findById(id);
    if(!blog){
      return res.status(404).json({message : "No blog with that id"})
    }else{
      return res.status(200).json(blog)
    }
  }catch(e){
    console.log({message : e.message})
  }
}

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ Message: "Cannot find blog" });
    }

    if (blog.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({ msg: `Blog with id ${id} deleted succesfully` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Cannot find the blog with that id" });
    }

    if (blog.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body);

    res.status(200).json({ updatedBlog });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const blog = Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            userId: req.user.id,
            comment: comment,
          },
        },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(201).json(updatedBlog);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
