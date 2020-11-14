const Artista = require("../models/Artista")
const fs = require('fs')
const path = require('path')
const uploadConfig = require('../config/upload')

module.exports = {
    async store(req, res) {
        let filename = 'cover-artista.png'
        if (req.file != undefined) {
            filename = req.file.filename
        }
        const { name, bio } = req.body;

        const artistaExists = await Artista.findOne({ name: name })

        if (artistaExists) {
            return res.json({ artistaExists, menssage: "artista exist!" })
        }
        try {
            if (req.file != undefined) {
                await fs.promises.rename(path.resolve(uploadConfig.dest, filename), path.resolve(uploadConfig.dest, "cover", filename))
            }
            const artista = await Artista.create({
                name, bio, covername: filename
            })
            return res.json({ artista, menssage: "create sucess!" })
        } catch (error) {
            return res.json(error)
        }
    },
    async update(req, res) {
        const { artistaId } = req.params;
        const artistaExists = await Artista.findById(artistaId)
        if (!artistaExists) {
            return res.status(400).json({ erro: "artista not exists!" })
        }

        const { name, bio } = req.body
        const { filename } = req.file
        try {
            const artista = await Artista.findByIdAndUpdate(artistaId, {
                name, bio, covername: filename
            })
            return res.json({ artista, menssage: "update sucess!" })
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async delete(req, res) {
        const { artistaId } = req.params;
        const artistaExists = await Artista.findById(artistaId)
        if (!artistaExists) {
            return res.status(400).json({ erro: "artista not exists!" })
        }
        try {
            const artista = await Artista.findByIdAndDelete(artistaId)
            return res.json({ artista, menssage: "delete sucess!" })
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async show(req, res) {
        const { artistaId } = req.params;
        const artistaExists = await Artista.findById(artistaId)
        if (!artistaExists) {
            return res.status(400).json({ erro: "artista not exists!" })
        }
        return res.json(artistaExists)
    },
    async index(req, res) {
        const artista = await Artista.find()
        return res.json(artista)
    }
};

