const fs = require('fs');

const uploadFileController = {};

uploadFileController.uploadImage = async function (req, res) {
    if (req.body) {
        const file = req.body.file.toString();
        const fileType = req.body.fileType;
        const base64Data = file.substr(file.indexOf(',') + 1, file.length);
        path = `${process.env.ASSETS_IMAGES_PATH}/${Date.now()}.${fileType}`;

        await fs.writeFile(path, base64Data, 'base64', function(err) {
            if (err) {
                return res.status(500).json({ error: err });
            }
        });
    }
}

module.exports = uploadFileController;
