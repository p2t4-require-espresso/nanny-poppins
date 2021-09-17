const router = require('express').Router();

const dashboardRoutes= require('./dashboardRoutes')
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes)


module.exports = router;
