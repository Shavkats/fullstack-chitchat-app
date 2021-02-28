const router = require('express').Router();
const Post = require('../models/Post.js');
const passport = require('passport');

// @route   POST api/posts/add
// @desc    Create post
// @access  Private
router.route('/add')
	.post(
		passport.authenticate('jwt', { session: false }),
		(req, res) => {
			const text = req.body.text.trim()

			const newPost = new Post({
				user: {
					id: req.user.id,
					login: req.user.login,
					avatar: req.user.avatar
				},
				text
			})

			newPost.save()
				.then(post => res.json(post))
				.catch(err => console.log(err))
});

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.route('/')
		.get((req, res) => {
			Post.find()	
				.sort({ createdAt: -1 })
				.then(posts => res.json(posts))
				.catch(err => console.log(err))
});


router.route('/following')
	.get(
		passport.authenticate('jwt', { session: false }),
		(req, res) => {
			Post.find({
				'user.id': { $in: req.user.following }
			})
			.sort({ createdAt: -1 })
			.then(posts => res.json(posts))
			.catch(err => console.log(err))
});

router.route('/:userId')
	.get((req, res) => {
		Post.find({ 'user.id': req.params.userId })
			.sort({ createdAt: -1 })
			.then(posts => res.json(posts))
			.catch(err => console.log(err))
});

module.exports = router