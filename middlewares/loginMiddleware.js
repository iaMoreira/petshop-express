const loginMiddleware = (req, res, next) => {
    if (!req.session.usuario) {
        // return res.redirect('/login')
        return res.status(403).json({mensagem: "usuário não está logado."});
    } 

   return next();
}

module.exports = loginMiddleware