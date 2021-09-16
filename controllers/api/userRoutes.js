const router = require('express').Router();
const { User , Rating} = require('../../models');
const withAuth= require("../../utils/auth")

//GET ALL USERS 
router.get('/', async (req,res)=>{
  try{
    const userData= await User.findAll({
      include:[{
        model:Rating
      }]
    })
    res.status(200).json(userData);
  }
  catch(err){
    res.status(500).json(err)
  }
})
//gets all nanny users
router.get('/nannies', async (req,res)=>{
  try{
    const userData= await User.findAll({
      where:{
        user_type:["nanny"]
      },
      include:[{
        model:Rating
      }]
    })
    res.status(200).json(userData);
  }
  catch(err){
    res.status(400).json(err)
  }
})
//gets all users: parents
router.get('/parents', async (req,res)=>{
  try{
    const userData= await User.findAll({
      where:{
        user_type:["parent"]
      },
      include:[{
        model:Rating
      }]
    })
    res.status(200).json(userData);
  }
  catch(err){
    res.status(400).json(err)
  }
})

//finding one USER
router.get('/:id', async (req,res)=>{
  try{
    const oneUser= await User.findByPk(req.params.id)
    res.status(200).json(oneUser)
  }
  catch(err){
    res.status(400).json(err)
  }
})
//CREATES A NEW USER
router.post('/', async (req, res)=>{
  try{
    const userData = await User.create(req.body);
      
      req.session.save(() => {
      req.session.user_type = userData.user_type;
      req.session.logged_in = true;

      res.status(200).json(userData);
  });
  }
  catch(err){
    res.status(400).json(err)
  }
})

//update USER IF LOGGED IN!!!!!
router.put('/:id', withAuth, async (req, res)=>{
  try{
    const userData = await User.update(req.body,{
      where:{
        id: req.params.id
      }
      //finish writing this route.....
    })
  }
  
  catch(err){
    res.status(400).json(err)
  }
})
 

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
