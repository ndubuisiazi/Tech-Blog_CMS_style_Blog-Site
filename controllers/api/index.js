const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./blog_post');
const dashRoutes = require('./dashboard-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/dashboard', dashRoutes);

module.exports = router;
