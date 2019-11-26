const uploadFileRouter = require('express').Router();
const uploadFileController = require('../controllers/upload-file.controller');

uploadFileRouter.post('/api/v1/upload-image', uploadFileController.uploadImage);

module.exports = uploadFileRouter;