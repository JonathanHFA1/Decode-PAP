const cloudinary = require('../utils/cloudinary');
const Post = require('../models/postModel');
const errorResponse = require('../utils/errorResponse');

// create livro

exports.createBook = async (req, res, next) => {
  const { title, content, postedBy, image, likes, comments } = req.body;

  try {
    //upload da imagem no cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: 'posts',
      width: 1200,
      crop: 'scale',
    });
    const post = await Post.create({
      title,
      content,
      postedBy: req.user._id,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// show livro

exports.showBook = async (req, res, next) => {
  try {
    //mostrar o ultimo criado, e adcionar no posted by
    const posts = await Post.find().sort({ createdAdt: -1 }).populate('postedBy', 'name');
    res.status(201).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// show single livro

exports.showSingleBook = async (req, res, next) => {
  try {
    //mostrar o ultimo criado, e adcionar no posted by
    const post = await Post.findById(req.params.id).populate('comments.postedBy', 'name');
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// delete livro
exports.deleteBook = async (req, res, next) => {
  const currentBook = await Post.findById(req.params.id);

  //deletar imagem do cloudinary
  const Imgid = currentBook.image.public_id;
  if (Imgid) {
    await cloudinary.uploader.destroy(Imgid);
  }
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Livro deletado',
    });
  } catch (error) {
    next(error);
  }
};

// update livro
exports.updateBook = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;
    const currentBook = await Post.findById(req.params.id);

    //data object
    const data = {
      title: title || currentBook.title,
      content: content || currentBook.content,
      image: image || currentBook.image,
    };

    //modificar imagem do post condicaos
    if (req.body.image !== '') {
      const Imgid = currentBook.image.public_id;
      if (Imgid) {
        await cloudinary.uploader.destroy(Imgid);
      }
      const newImage = await cloudinary.uploader.upload(req.body.image, {
        folder: 'posts',
        width: 1200,
        crop: 'scale',
      });
      data.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    //book recem atualizado
    const postUpdate = await Post.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json({
      success: true,
      postUpdate,
    });
  } catch (error) {
    next(error);
  }
};

//add comentarios
exports.addComment = async (req, res, next) => {
  const { comment } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: { text: comment, postedBy: req.user._id } },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};
//add addlike
exports.addLike = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeLike = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};
