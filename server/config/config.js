//==========
//Puerto
//=========

process.env.PORT = process.env.PORT || 3000;

//==========
//Entorno
//=========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==========
//Base de datos
//=========

let urlDB;
if (process.env.NODE_ENV === 'devi') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://gvidal:123@cluster0-et3nb.mongodb.net/cafe';
}

process.env.URLDB = urlDB;