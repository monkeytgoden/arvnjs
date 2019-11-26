const { check, validationResult } = require('express-validator');

const userValidator = {};

userValidator.registerUser = function(req, res, next) {
	req.check('email', 'Invalid email.').isEmail();
	req.check('email', 'Email is required.').notEmpty();
	req.check('user_name', 'UserName is required.').notEmpty();
	req.check('password', 'Password is required.').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ errors: errors });
	}
	return next();
}

module.exports = userValidator;
