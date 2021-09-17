const router = require('express').Router();
const { User , Rating, Nanny} = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newProject = await Project.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newProject);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


//when logged in, user is able to delete a review
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const reviewData = await Rating.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
