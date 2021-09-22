const router = require('express').Router();
const { User , Communication} = require('../../models');
const withAuth = require('../../utils/auth');

// Shows all of the messages you've sent as a parent 
router.get('/parent', withAuth, async (req,res)=>{
    try{
        const messagingData = await Communication.findAll({
            include: [{model: User, as: "parent"}]
        })
        res.status(200).json(messagingData);
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.get('/nanny', withAuth, async (req,res)=>{
    try{
        const messagingData = await Communication.findAll({
            include: [{model: User, as: "nanny"}]
        })
        res.status(200).json(messagingData);
    }
    catch(err){
        res.status(400).json(err);
    }
})

// creates a new message between users
router.post('/', withAuth, async (req,res)=>{
    const message = req.body
    try{
        const newMessage = await Communication.create({...message, userId: req.session.userId})
        res.status(200).json(newMessage);
    }
    catch(err){
        res.status(400).json(err);
    }
})
module.exports = router