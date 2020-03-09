//==========
//Puerto
//=========

process.env.PORT = process.env.PORT || 3000;

//==========
//Entorno
//=========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==========
//Vencimiento del token
//=========
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//==========
//SEED de autenticación
//=========
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//==========
//Base de datos
//=========

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//============
//Google Client
//===========

process.env.CLIENT_ID = process.env.CLIENT_ID || '998332387975-bc58erfn6ms8s27agkq93nk0ur3qioe4.apps.googleusercontent.com';