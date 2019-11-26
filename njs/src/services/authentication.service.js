const configs = require('../configs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authService = {};

authService.requiresLogout = function (req, res, next) {
	var token = getToken(req);
	if (token) {
		jwt.verify(token, configs.secret.SESSION_SECRET, function (err, decoded) {
			if (err) {
				return next();
			} else {
				return res.status(400).json({message: 'You are already logged in. Please sign out!'})
			}
		});
	} else {
		return next();
	}
}

authService.requiresLogin = function (req, res, next) {
	var token = getToken(req);
	if (token) {
		jwt.verify(token, configs.secret.SESSION_SECRET, async function (err, decoded) {
			if (err) {
				return res.status(500).json({ message: 'Failed to authenticate token!' });
			} else {
				const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
				if (!user || checkExpire(decoded.exp)) {
					return res.status(403).json({ message: 'Access Denied' });
				}
				req.user = user;
				req.token = token;
				return next();
			}
		});
	} else {
		return res.status(403).json({ message: 'Access Denied' });
	}
}

function getToken(req) {
	var token = req.body.token || req.params.token || req.headers['authorization'];
	if (token && token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length);
	}
	return token;
}

function checkExpire(exp) {
	return new Date().valueOf() > new Date(exp*1000).valueOf();
}

module.exports = authService;