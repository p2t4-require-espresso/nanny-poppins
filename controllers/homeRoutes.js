const router = require('express').Router();
const { User, Rating } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const profileData = await User.findAll({
      where: {
        user_type: ['nanny']
      },
      //dont include the password
      attributes: ['id', 'name', 'photo', "nanny_age", "age_range", "experience_years", "email", "certification", "bio", "hourly_rate"],
      include: {
        model: Rating,
        attributes: ['stars', 'review']
      }
    });

    // Serialize data so the template can read it
    const profiles = profileData.map((profile) => profile.get({ plain: true }));
    console.log("home route session*********", req.session);
    console.log(profiles)
    // Pass serialized data and session flag into template
    res.render('homepage', {
      profiles,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  console.log(req.session)
  res.render('login');
});


router.get('/upload', withAuth, (req, res) => {
  console.log("test", req)
  res.render('upload')
})

//user clicks on a profile card on homepage and is taken to the nanny's profile page
router.get('/:id', withAuth, async (req, res) => {
  try {
    const oneUser = await User.findByPk(req.params.id, {
      include: [{
        model: Rating,
        include: [{ model: User, as: "parent" }],
        attributes: ['stars', 'review']
      }],
    })
    const reviewData = await Rating.findByPk(req.params.id, {
      include: [{ model: User, as: "parent" }]
    })

    const singleProfile = oneUser.get({ plain: true })
    console.log(singleProfile)
    //coming back as null on some user profiles...
    const review = reviewData.get({plain:true})

    res.render('viewuser', {
      ...singleProfile,
      ...review,
      logged_in: true
    })
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

module.exports = router;
