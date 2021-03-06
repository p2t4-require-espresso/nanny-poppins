const router = require('express').Router();
const { User, Rating, Communication } = require('../models');
const withAuth = require("../utils/auth")


//user able to see all nanny profiles with no-info hidden from nanny profile card
router.get('/', withAuth, async (req, res) => {
    try {
        const profileData = await User.findAll({
            where: {
                user_type: ['nanny']
            },
            attributes: ['id', 'name', 'email', 'photo', "nanny_age", "age_range", "experience_years", "certification", "bio", "hourly_rate"],
            include: {
                model: Rating,
                attributes: ['stars', 'review']
            }
        });
        const profiles = profileData.map((profile) => profile.get({ plain: true }))
        res.status(200).json(profileData)
        res.render('homepage', {
            profiles,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err)
    }
})
//user signs in and get redirected to their profile handlebar and sees all their info
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Rating, attributes: ['stars', 'review'] }],
        }); 
        const nannies= (await User.findAll({
            where:{
              user_type:["nanny"]
            },
            include:[{
              model:Rating,
              include:[{model:User, as:"parent"}],
            }],
          })).map(nanny=>nanny.get({plain:true}))
          console.log(nannies);
    
        const messages = (await Communication.findAll({
            where: {
                receiver_id: req.session.user_id
            }
        })).map(message => message.get({plain:true}))
        console.log(messages);
        if (messages.length == 0) {
            console.log("No messages!");
        } else {
            console.log(`You have ${messages.length} messages!!`);
        }
        // const messages = messageData.get({plain: true});
        // console.log("messages: " + messageData);
        const user = userData.get({ plain: true });
        console.log(user)
        console.log(user.email)
        res.render('profile', {
            ...user,
            nannies,
            logged_in: true,
            messages
        });
    }
    catch (err) {
        res.status(500).json(err)
    }
})


router.get('/edit-profile', withAuth, async (req, res) => {
    console.log(req.body)
    console.log(req.session.user_id)
    try {
        // Find the logged in user based on the session.user_id
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            // include: [{ model: Rating, attributes: ['stars', 'review'] }],
        }); 
        // console.log(req.body)
        const user = userData.get({ plain: true });
        console.log(user)
        res.render('edit-profile', {
            ...user,
            logged_in: true
        });
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
