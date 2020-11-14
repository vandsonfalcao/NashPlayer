const express = require('express')
const fs = require('fs')
const getStat = require('util').promisify(fs.stat);
const path = require('path')
const multer = require('multer');
const uploadConfig = require('./src/config/upload');
const ArtistaControler = require('./src/controlers/ArtistaControler');
const MusicaControler = require('./src/controlers/MusicaControler');
const upload = multer(uploadConfig);

const routes = express.Router()

//  HOME
routes.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, "public", "main.html"))
})

routes.get('/upload', (req, res) => {
    return res.sendFile(path.resolve(__dirname, "public", "upload.html"))
})

routes.get('/upload/artista', (req, res) => {
    return res.sendFile(path.resolve(__dirname, "public", "artista.html"))
})

routes.get('/upload/musica', (req, res) => {
    return res.sendFile(path.resolve(__dirname, "public", "musica.html"))
})

routes.get('/list', (req, res) => {
    const musicas = fs.readdirSync(path.resolve(__dirname, "tmp"))

    return res.json(musicas)
})

routes.get('/audio/:track', async (req, res) => {
    const { track } = req.params
    //console.log(track)

    const stat = await getStat(path.resolve(__dirname, "tmp", "music", track));
    const highWaterMark = 128;

    //console.log(stat.size)
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size,
        'Accept-Ranges': 'bytes',
    });

    const stream = fs.createReadStream(path.resolve(__dirname, "tmp", "music", track), { highWaterMark });
    // só exibe quando terminar de enviar tudo
    stream.on('end', () => console.log('acabou'));
    // faz streaming do audio 
    stream.pipe(res);

});

//  CONTROLER ARTISTA
//  create
routes.post("/artista", upload.single('cover'), ArtistaControler.store);
//  update
routes.put("/artista/:artistaId", upload.single('cover'), ArtistaControler.update);
//  delete
routes.delete("/artista/:artistaId", ArtistaControler.delete);
//  show
routes.get("/artista/:artistaId", ArtistaControler.show);
//  index
routes.get("/artista", ArtistaControler.index);

//  CONTROLER MUSICA
//  create
routes.post("/musica", upload.fields([{ name: 'music', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), MusicaControler.store);
//  update
routes.put("/musica/:musicaId", MusicaControler.update);
//  delete
routes.delete("/musica/:musicaId", MusicaControler.delete);
//  show
routes.get("/musica/:musicaId", MusicaControler.show);
//  index
routes.get("/musica", MusicaControler.index);

module.exports = routes;