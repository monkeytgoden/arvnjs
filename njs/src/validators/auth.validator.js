const { check, validationResult } = require('express-validator');

const authValidator = {};

authValidator.login = function(req, res, next) {
	req.check('user_name', 'UserName is required.').notEmpty();
	req.check('password', 'Password is required.').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		return res.status(400).json({ errors: errors });
	}
	return next();
}

module.exports = authValidator;
