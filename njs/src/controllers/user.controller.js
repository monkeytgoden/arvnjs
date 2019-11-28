'use strict';
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const fs = require('fs');

const userController = {};
const fields = '_id user_name email first_name last_name birthday gender marital_status address mobile avatar status created_date created_by updated_date updated_by';

userController.getUsers = function (req, res) {
    User.find({}, fields, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        result.map(ele => ele.avatar = ele.avatar ? 'http://localhost:9999/' + ele.avatar : '');
        res.status(200).json(result);
    });
};

userController.resgisterUser = function (req, res) {
    bcrypt
        .hash(req.body.password, 10)
        .then(hash => {
            const user = new User(req.body);
            user.password = hash;
            user.save((err, result) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.status(200).json({ message: 'Register user successfully' });
            });
        })
        .catch(error => res.status(500).json({ error: error }));
};

userController.getUserById = function (req, res) {
    User.findById(req.params.userId, fields, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        result.avatar = result.avatar ? 'http://localhost:9999/' + result.avatar : '';
        res.status(200).json(result);
    });
};

userController.updateUser = async function (req, res) {   
    let path = null;
    if (req.body.newAvatar && req.body.newAvatar.file) {
      const file = req.body.newAvatar.file.toString();
      const fileType = req.body.newAvatar.fileType;
      const base64Data = file.substr(file.indexOf(',') + 1, file.length);
      path = `${process.env.ASSETS_IMAGES_PATH}/${Date.now()}.${fileType}`;
      await fs.writeFile(path, base64Data, 'base64', function(err) {
          if (err) {
              return res.status(500).json({ error: err });
          }
      });
    }

    // { new: true } an option that asks mongoose to return the updated version of the document instead of the pre-updated one
    User.findOneAndUpdate({ _id: req.params.userId }, path ? { ...req.body, avatar: path } : { ...req.body }, { new: true }, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Update user successfully' });
    });
};

userController.deleteUser = function (req, res) {
    User.remove({
        _id: req.params.userId
    }, function (err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Delete user successfully' });
    });
};

module.exports = userController;