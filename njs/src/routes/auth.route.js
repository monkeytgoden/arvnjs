const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');
const authenService = require('../services/authentication.service');

authRouter.post('/api/v1/login', authenService.requiresLogout, authValidator.login, authController.login);
authRouter.get('/api/v1/logout', authenService.requiresLogin, authController.logout);

module.exports = authRouter;
