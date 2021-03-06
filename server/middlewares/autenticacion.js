const jwt = require('jsonwebtoken');
//=================
//Verificar Token
//=================


let verificaToken = (req, res, next) => {
    let token = req.get('token'); //En los headers
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    messaje: 'Token no válidos'
                },

            })
        }
        req.usuario = decoded.Usuario;
        next();

    });
};

//=================
//Verificar admin role
//=================

let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (!(usuario.role === 'ADMIN_ROLE')) {
        return res.status(401).json({
            ok: false,
            err: {
                messaje: 'No tiene permiso para realizar esta acción'
            }
        })
    } else {
        next();
    }

};

//=================
//Verificar Token de una imagen
//=================


let verificaTokenImg = (req, res, next) => {
    let token = req.query.token; //En los headers
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    messaje: 'Token no válidos'
                },

            })
        }
        req.usuario = decoded.Usuario;
        next();

    });
};
module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}