const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const configs = require('../configs');
const bcrypt = require('bcrypt');

const authController = {};

authController.login = function (req, res) {
	User.findOne(
		{ user_name: req.body.user_name },
		function (err, user) {
			if (err) {
				return res.status(500).json({
					error: err
				});
			}
			if (!user) {
				return res.status(400).json({ message: 'UserName is not found' })
			}
			bcrypt.compare(req.body.password, user.password, async (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Unauthorized Access'
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							email: user.email,
							_id: user._id
						},
						configs.secret.SESSION_SECRET,
						{
							expiresIn: '1d'
						}
					);
					user.tokens = user.tokens.concat({token});
    				await user.save();
					return res.status(200).json({
						message: 'Login success!',
						user: {
							_id: user._id,
							user_name: user.user_name,
							email: user.email,
							first_name: user.first_name,
							last_name: user.last_name,
							birthday: user.birthday,
							gender: user.gender,
							marital_status: user.marital_status,
							address: user.address,
							mobile: user.mobile,
							avatar: user.avatar,
							status: user.status,
							created_date: user.created_date,
							created_by: user.created_by,
							updated_date: user.updated_date,
							updated_by: user.updated_by
						},
						token: token,
						expiresIn: 86400
					})
				}
				return res.status(401).json({
					message: 'Unauthorized Access'
				});
			})
		})
}

authController.logout = async function (req, res) {
	// >>> Using session
	// if (req.session) {
	// 	req.session.destroy(function (err) {
	// 		if (err) {
	// 			return res.status(500).json({ error: err });
	// 		} else {
	// 			return res.status(200).json({ 'message': "Logout success!" });
	// 		}
	// 	});
	// }

	// >>> Using JWT
	
	// Log user out of the application
	// try {
    //     req.user.tokens = req.user.tokens.filter((token) => {
    //         return token.token != req.token;
    //     })
    //     await req.user.save();
    //     return res.status(200).json({ 'message': "Logout success!" });
    // } catch (err) {
    //     return res.status(500).json({ error: err });
	// }
	
	// Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        return res.status(200).json({ 'message': "Logout success!" });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

module.exports = authController;