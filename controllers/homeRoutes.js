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


router.get('/upload',  (req,res)=>{
  console.log("test", req)
  // if(logged_in){
  res.render('upload') 
// }
})

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
    console.log("sing progile",singleProfile)
    // console.log(reviewData, "review data")
    const review = reviewData.get({plain:true})
    console.log("review", review)
    // console.log("single review" ,review.review)
    // console.log("parent and review", review.parent.name)
    // console.log("star rating", review.stars)
    const reviewerName = review.parent.name;
    const reviews =review.review
    // add all star values and divide by the amount given aka the average
    const starRatings = review.stars
    if(reviewData){}
    res.render('viewuser',{
      ...singleProfile,
      ...review,
      starRatings,
      reviewerName,
      reviews,
      logged_in: true
    })
  }
  catch(err){
    res.status(400).json(err)
  }
})

module.exports = router;
