const router = require('express').Router();
const { User, Rating } = require('../models');
const withAuth = require('../utils/auth');



//LANDING PAGE--want users(logged in or not) to see all nannys but not see all info about them
  //dont include hourly rate and maybe certification if user is not signed in
      //add an if statement in the handlebars
router.get('/', async (req, res) => {
  try{
    const profileData= await User.findAll({
        where:{
            user_type:['nanny']
        },
        //dont include the password
        attributes:['id','name','photo',"nanny_age","age_range","experience_years","email", "certification","bio", "hourly_rate"],
        //when user isnt logged in dont include stars and reviews
          //in place of them--add text to say:"SIGN UP TO SEE NANNY REVIEWS AND RATINGS"
        include:{
          model:Rating,
          attributes:['stars','review']
      }
    });

    // Serialize data so the template can read it
    const profiles = profileData.map((profile) => profile.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      profiles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//user clicks on a profile card on homepage and is taken to the nanny's profile page
router.get('/:id', async (req,res)=>{
  try{
    const oneUser= await User.findByPk(req.params.id,{
      include:[{
        model:Rating,
        include:[{model:User, as:"parent"}],
        attributes:['stars','review']
      }],
    })
    const reviewData= await Rating.findByPk(req.params.id,{
      include: [{model: User, as: "parent"}]
    })
    
    const singleProfile = oneUser.get({plain:true})
    console.log(reviewData, "review data")
    const review = reviewData.get({plain:true})
    console.log("review", review)
    console.log("single review" ,review.review)
    console.log("parent and review", review.parent.name)
    const reviewerName = review.parent.name;
    const reviews =review.review
    res.render('viewuser',{
      ...singleProfile,
      ...review,
      reviewerName,
      reviews,
      logged_in: true
    })
  }
  catch(err){
    res.status(400).json(err)
  }
})

//USER able to click on a nanny profile and redirects to a new page
  //dont think i need this

// // Use withAuth middleware to prevent access to route

// i wrote a profile route in the dashboardroutes folder...dbl check if it should be here

// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
