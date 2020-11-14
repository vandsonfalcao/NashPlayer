const { Schema, model } = require('mongoose')

const MusicaSchema = new Schema({
    artistaId: {
        type: Schema.Types.ObjectId,
        ref: 'Artista',
        required: true
    },
    colab: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    covername: {
        type: String,
        default: "none"
    }
}, {
    timestamps: true
});

module.exports = model("Musica", MusicaSchema);