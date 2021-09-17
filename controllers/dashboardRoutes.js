const router= require('express').Router();
const { User , Rating} = require('../models');
const withAuth= require("../utils/auth")




//user able to see all nanny profiles with no-info hidden from nanny profile card
router.get('/', withAuth, async (req,res)=>{
    try{
        const profileData= await User.findAll({
            where:{
                user_type:['nanny']
            },
            attributes:['id','name','email','photo',"nanny_age","age_range","experience_years", "certification","bio","hourly_rate"],
            include:{
                model:Rating,
                attributes:['stars','review']
            }
        });
        const profiles = profileData.map((profile)=> profile.get({ plain:true }))
        res.status(200).json(profileData)
        res.render('dashboard', { 
            profiles, 
            logged_in: req.session.logged_in 
          });
    }
    catch(err){
        res.status(500).json(err)
    }
})
//user signs in and get redirected to their profile handlebar and sees all their info
router.get('/profile', withAuth,async(req,res)=>{
    try{
          // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Rating, attributes:['stars','review'] }],
          });
          const user = userData.get({ plain: true });
          console.log(user)
          console.log(user.email)
          res.render('profile', {
            ...user,
            logged_in: true
          });
    }
    catch(err){
    res.status(500).json(err)
    }
})
//user able to add review for Nannys
//HTML Will have to include a add review button
router.get('/edit/:id', async (req,res)=>{
    try{
        const editReview= await User.findByPk(req.params.id,{
            where:{
                user_type:['nanny']
            },
            exclude:['id','name','email','photo',"nanny_age","age_range","experience_years", "certification","bio","hourly_rate"],
            include:{
                model:Rating,
                attributes:['stars','review']
            }
        })
        if(!editReview){
            res.status(404).json({message:"No user found with that ID"})
        }
        const review = editReview.get({ plain:true })
        // console.log(review)
        const targetedReview =review.ratings[0].review;
        const stars =review.ratings[0].stars;
        console.log(review.ratings[0].review)
        res.render('edit-review', {review, targetedReview, stars ,logged_in:true})
    }
    catch(err){
        res.status(500).json(err)
    }
});


//ERROR HERE GETTING A 500 ERROR
    //do i need a put method here? isnt this being taken care of in the user routes?
router.put('/profile', withAuth, async (req,res)=>{
    try{
        // Find the logged in user based on the session ID
      const userData = await User.update(req.body,{
        //shouldnt the id be  for the user thats logged in?
        where:{
             id:req.session.id
         },

        });
        const user = userData.get({ plain: true });
        console.log(user)
        res.render('profile', {
          ...user,
          logged_in: true
        });
  }
  catch(err){
  res.status(500).json(err)
  }
})
module.exports= router;
