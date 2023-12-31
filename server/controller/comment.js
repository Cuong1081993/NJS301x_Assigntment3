import Comment from "../models/Comment.js";

export const commentProduct = async (req, res, next) => {
  try {
    const idProduct = req.params.prodId;
    const comment_product = await Comment.find({ idProduct: idProduct });
    res.status(200).json(commentProduct);
  } catch (error) {
    return next(error);
  }
};
export const sendComment = async (req, res, next) => {
  try {
    const { idProduct, idUser, fullName, content, star } = req.body;
    const data = {
      idProduct,
      idUser,
      fullName,
      content,
      star,
    };
    await Comment.insertMany(data);
    res.status(200).json("Success");
  } catch (error) {
    return next(error);
  }
};
