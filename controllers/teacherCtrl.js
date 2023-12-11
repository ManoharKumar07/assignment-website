const assignmentModel = require("../models/assignmentModel");

const postAssignmentController = async (req, res) => {
  const { title, category, content, thumbnail } = req.body;

  try {
    const newBlogPost = new assignmentModel({
      title,
      category,
      content,
      thumbnail,
    });

    await newBlogPost.save();
    res.status(201).json({ message: "Post added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  postAssignmentController,
};
