const Musica = require("../models/Musica");
const fs = require('fs')
const path = require('path')
const uploadConfig = require('../config/upload')

module.exports = {
    async store(req, res) {
        let coverName = 'cover-musica.png'
        if (req.files.cover != undefined) {
            const { cover } = req.files
            coverName = cover[0].filename
            console.log("pegou o file")
        }
        const { music } = req.files
        const { artistaId, colab, name, genre } = req.body;
        const musicName = music[0].filename
        const musicSize = music[0].size

        try {
            if (req.files.cover != undefined) {
                await fs.promises.rename(path.resolve(uploadConfig.dest, coverName), path.resolve(uploadConfig.dest, "cover", coverName))
            }
            await fs.promises.rename(path.resolve(uploadConfig.dest, musicName), path.resolve(uploadConfig.dest, "music", musicName))
            const musica = await Musica.create({
                artistaId, colab, name, genre, filename: musicName, size: musicSize, covername: coverName
            })
            return res.json({ musica, menssage: "create sucess!" })
        } catch (error) {
            return res.json(error)
        }
    },
    async update(req, res) {
        const { musicaId } = req.params;
        const musicaExists = await Musica.findById(musicaId)
        if (!musicaExists) {
            return res.status(400).json({ erro: "musica not exists!" })
        }

        const { name, genre, colab, covername } = req.body;
        try {
            const musica = await Musica.findByIdAndUpdate(musicaId, {
                name, genre, colab, covername
            })
            return res.json({ musica, menssage: "update sucess!" })
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async delete(req, res) {
        const { musicaId } = req.params;
        const musicaExists = await Musica.findById(musicaId)
        if (!musicaExists) {
            return res.status(400).json({ erro: "musica not exists!" })
        }
        try {
            const musica = await Musica.findByIdAndDelete(musicaId)
            return res.json({ musica, menssage: "delete sucess!" })
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async show(req, res) {
        const { musicaId } = req.params;
        const musicaExists = await Musica.findById(musicaId)
        if (!musicaExists) {
            return res.status(400).json({ erro: "musica not exists!" })
        }
        return res.json(musicaExists)
    },
    async index(req, res) {
        const musica = await Musica.find().populate('artistaId')
        return res.json(musica)
    }
};