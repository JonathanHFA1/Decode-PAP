const cloudinary = require('../utils/cloudinary');
const Post = require('../models/postModel');
const errorResponse = require('../utils/errorResponse');


// create livro

exports.createBook = async (req, res, next) => {
    const { title, content, postedBy, image, likes, comments } = req.body;

    try {
        //upload da imagem no cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: "posts",
            width: 1200,
            crop: "scale"
        })
        const post = await Post.create({
            title,
            content,
            postedBy: req.user._id,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },

        });
        res.status(201).json({
            success: true,
            post
        })


    } catch (error) {
        console.log(error);
        next(error);
    }

}
