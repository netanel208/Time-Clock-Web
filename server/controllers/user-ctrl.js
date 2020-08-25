const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../db/index");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/user-model");
const { update } = require("../models/user-model");


register = async (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});
			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
					.save()
					.then(user => res.json(user))
					.catch(err => console.log(err));
				});
			});
		}
	});
}

login = async (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ emailnotfound: "Email not found" });
		}
		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name
				};
				// Sign token
				jwt.sign(
				payload,
				keys.secretOrKey,
				{
					expiresIn: 31556926 // 1 year in seconds
				},
				(err, token) => {
					res.json({
						success: true,
						token: "Bearer " + token
					});
				});
			} else {
				return res
				.status(400)
				.json({ passwordincorrect: "Password incorrect" });
			}
		});
	});
}

getUserByEmail = async (req, res) => {
    await User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.name = body.name;
		user.phone = body.phone;
		user.city = body.city;
		user.address = body.address;
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
				console.log(user);
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    })
}

module.exports = {
    register,
	login,
	getUserByEmail,
	updateUser,
}