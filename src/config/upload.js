const { diskStorage } = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');

module.exports = {
    dest: resolve(__dirname, '..', '..', 'tmp'),
    storage: diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp'),
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) cb(err);

                const filename = res.toString('hex') + extname(file.originalname);

                return cb(null, filename);
            });
        },
    }),
};