'use strict';
const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const userValidator = require('../validators/user.validator');

userRouter.route('/api/v1/users')
    .get(userController.getUsers)
    .post(userValidator.registerUser, userController.resgisterUser);

userRouter.route('/api/v1/users/:userId')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;