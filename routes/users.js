const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');
const passport = require('passport')
const keys = require('../config/keys');
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        login: req.body.login,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

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
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, login: user.login, avatar: user.avatar };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 360000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.route('/')
	.get( passport.authenticate('jwt', { session: false }),(req, res) => {
		res.json({
			_id: req.user._id,
			email: req.user.email,
			login: req.user.login,
			avatar: req.user.avatar,
			followers: req.user.followers,
			following: req.user.following
		})
})

router.route('/follow')
	.post(
		passport.authenticate('jwt', { session: false }),
		(req, res) => {
			User.findOneAndUpdate({
				_id: req.user.id 
			}, {
				$push: { following: req.body.userId }
			},
			{ new: true })
			.then(user => {
				User.findOneAndUpdate({
					_id: req.body.userId
				}, {
					$push: { followers: req.user.id }
				}, { new: true})
				.then(user => res.json({ userId: req.body.userId }))
				.catch(err => console.log(err))
			})
			.catch(err => console.log(err))
})

router.route('/unfollow')
	.post(
		passport.authenticate('jwt', { session: false }),
		(req, res) => {
			User.findOneAndUpdate({
				_id: req.user.id
			}, {
				$pull: { following: req.body.userId }
			}, { new: true })
			.then(user => {
				User.findOneAndUpdate({
					_id: req.body.userId
				}, { 
					$pull: { followers: req.user.id }
				}, { new: true })
				.then(user => res.json({ userId: req.body.userId }))
				.catch(err => console.log(err))
			})
			.catch(err => console.log(err))
		}
)

router.route('/:id')
	.get((req, res) => {
		User.findById(req.params.id)
			.then(user => {
				if (user) {
					return res.json({
						_id: user._id,
						email: user.email,
						login: user.login,
						avatar: user.avatar,
						followers: user.followers,
						following: user.following
					})
				} else {
					return res.status(404).json({ msg: 'User not found'})
				}
			})
			.catch(err => console.log(err))
})

module.exports = router 