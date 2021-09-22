const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const communicationRoutes = require('./communicationRoutes');


router.use('/users', userRoutes);
router.use('/communication', communicationRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
