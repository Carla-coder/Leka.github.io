const jwt = require('jsonwebtoken');
require('dotenv').config();

const validaAcesso = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.KEY, (err, data) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        } else {
            req.user = data; 
            next();
        }
    });
};

module.exports = {
    validaAcesso
};