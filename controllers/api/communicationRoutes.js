const router = require('express').Router();
const { User, Communication } = require('../../models');
const withAuth = require('../../utils/auth');

// Shows all of the messages you've sent as a parent 
router.get('/parent', withAuth, async (req, res) => {
    try {
        const messagingData = await Communication.findAll({
            include: [{ model: User, as: "parent" }]
        })
        res.status(200).json(messagingData);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

router.get('/nanny', withAuth, async (req, res) => {
    try {
        const messagingData = await Communication.findAll({
            include: [{ model: User, as: "nanny" }]
        })
        res.status(200).json(messagingData);
    }
    catch (err) {
        res.status(400).json(err);
    }
})

// creates a new message between users
router.post('/', withAuth, async (req, res) => {
    console.log("*********************************");
    console.log('communication Post', req.body, req.session.user_id);
    const message = req.body.message;
    const sender_id = req.session.user_id;
    const sender_name = req.session.name;
    try {
        const newMessage = await Communication.create({ message, receiver_id: req.body.receiver_id, sender_id, sender_name }).then(response => {
            console.log(response);
            res.status(200).json(response);
        }).catch(err => {
            console.log(err);
        })
        // res.status(200).json(newMessage);
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});
module.exports = router