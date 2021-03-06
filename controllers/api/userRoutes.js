const router = require('express').Router();
const { User, Rating } = require('../../models');
const withAuth = require("../../utils/auth")
const { uploadFile } = require("../../awsS3")




//GET ALL USERS 
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{
        model: Rating
      }]
    })
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(500).json(err)
  }
})
//gets all nanny users
router.get('/nannies', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        user_type: ["nanny"]
      },
      include: [{
        model: Rating,
        include: [{ model: User, as: "parent" }],
      }],
    })
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(400).json(err)
  }
})
//gets all users: parents
router.get('/parents', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        user_type: ["parent"],
      },
      include: [{
        model: Rating,
      }]
    })
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(400).json(err)
  }
})

//finding one USER
router.get('/:id', async (req, res) => {
  try {
    const oneUser = await User.findByPk(req.params.id, {
      include: [{
        model: Rating,
        include: [{ model: User, as: "parent" }],
        attributes: ['stars', 'review']
      }],

    })
    res.status(200).json(oneUser)
  }
  catch (err) {
    res.status(400).json(err)
  }
})
//CREATES A NEW USER
router.post('/', async (req, res) => {

  console.log(req.body, "req body from post route")

  try {
    //photo upload is now optional:
    if (req.file) {
      console.log("req.file", req.file)
      const uploadresult = await uploadFile(req.file)
      req.body.photo = uploadresult.Location;
      console.log(uploadresult)
    }
    const newUser = await User.create(req.body, {
      individualHooks: true
    });

    req.session.save(() => {
      req.session.user_type = newUser.user_type;
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);

    });
  }
  catch (err) {
    res.status(400).json(err)
  }
})


//update USER IF LOGGED In--this works, tested in Insomnia
router.put('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!userData[0]) {
      res.status(404).json({ message: "No User found with that ID" })
      return
    }
    res.status(200).json(userData)
  }
  catch (err) {
    res.status(400).json(err)
  }
})

router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_type = userData.user_type;
      req.session.name = userData.name;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
      console.log("user logged in")
    });

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.json({ message: "You are now logged out." })
      res.status(204).end();
      console.log("user logged out")
    });
  } else {
    res.status(404).end();
  }
});
//delete a user account, but user must be logged in.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      }
    })
    if (!deleteUser) {
      res.status(404).json({ message: "No User found" })
      return
    }
    res.status(200).json(deleteUser)
  }
  catch (err) {
    res.status(400).json(err);
  }
})



router.post('/upload', withAuth, async (req, res) => {
  console.log(req.file)
  //uploading the photo 
  const upload = await uploadFile(req.file)
  console.log("uploaded image", upload)
  const newphoto = upload.Location
  try {
    const updateUserPhoto = await User.update({
      photo: newphoto
    },
      {
        where: {
          id: req.session.user_id
        }
      })
    res.status(200).json({ msg: "Successful image upload" })
    console.log(updateUserPhoto)
  } catch (err) {
    res.status(500).json(err)
  }
})



module.exports = router;
