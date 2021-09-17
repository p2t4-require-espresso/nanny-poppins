const router = require('express').Router();
const userRoutes = require('./userRoutes');
const nannyRoutes = require('./nannyRoutes');
const reviewRoutes = require('./reviewRoutes');


router.use('/users', userRoutes);
router.use('/nannys', nannyRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
