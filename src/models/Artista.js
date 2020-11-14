const { Schema, model } = require('mongoose')

const ArtistaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        default: "Não acrescentaram bio nesse artista... poxa que pena :("
    },
    covername: {
        type: String,
        default: "none"
    }
}, {
    timestamps: true
});

module.exports = model("Artista", ArtistaSchema);