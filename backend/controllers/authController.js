const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse('E-mail already registred', 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
  exports.signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email) {
        return next(new ErrorResponse('Por favor adicione o email', 403));
      }
      if (!password) {
        return next(new ErrorResponse('Por favor adicione a senha', 403));
      }

      //check email do usuario
      const user = await User.findOne({ email });
      if (!user) {
        return next(new ErrorResponse('Credenciais invalidas', 400));
      }
      //check senha do usuario(vai buscar o models UserModel)
      const isMatched = await user.comparePassword(password);
      if (!isMatched) {
        return next(new ErrorResponse('Credenciais invalidas', 400));
      }
      //enviar o token
      sendTokenResponse(user, 200, res);
    } catch (error) {
      next(error);
    }
  };

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res
    .status(codeStatus)
    .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({
      success: true,
      id: user._id,
      role: user.role,
    });
};


//log out
exports.logout = async (req, res, next) => {
   res.clearCookie('token');
   res.status(200).json({
    success:true,
    message:"Desconectado"
   })
};

//perfil usuario
exports.userProfile = async (req, res, next) => {
const user = await User.findById(req.user.id).select('.password')
  res.status(200).json({
   success:true,
  user
  })
};