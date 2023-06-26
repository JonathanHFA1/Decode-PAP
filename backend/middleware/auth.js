const errorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')


//check se o user esta autenticado
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    // ter certeza que o token ja exxiste
    if (!token) {
        return next(new ErrorResponse('Voce deve logar...', 401));
    }

    try {
        // verificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse('You must Log In', 401));
    }
}


//middleware para o admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'user') {
        return next(new ErrorResponse('Acesso negado, voce deve ser um admin', 401));
    }
    next();
}