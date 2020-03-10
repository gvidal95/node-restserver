const express = require('express');

const _ = require('underscore');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();
let Categoria = require('../models/categoria');


//Mostrar todas Categorias
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Categoria.countDocuments((err, cuenta) => {
                res.json({
                    ok: true,
                    categorias,
                    cuenta
                });
            })
        });
});

//Mostrar Categoria por id
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    messaje: 'El id no es correcto'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

//Crear categoria
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;
    let usuario = req.usuario._id;
    // console.log(req);
    let categoria = new Categoria({
        descripcion: body.des,
        usuario
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

//Editar categoria

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['des']);
    let datos = {
        'descripcion': body.des
    };

    Categoria.findByIdAndUpdate(id, datos, { new: true, runValidators: true, context: 'query' }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

//Eliminar Categorias
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true
        })
    })
});

module.exports = app;