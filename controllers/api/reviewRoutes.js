const router = require('express').Router();
const { User, Rating } = require('../../models');
const withAuth = require('../../utils/auth');

//gets all reviews w the parent who wrote it
router.get('/', async (req, res) => {
  try {
    const reviewData = await Rating.findAll({
      include: [{ model: User, as: "parent" }]
    })
    res.status(200).json(reviewData);
  }
  catch (err) {
    res.status(400).json(err);
  }
})
//gets one reviews w the parent who wrote it
router.get('/:id', async (req, res) => {
  try {
    const reviewData = await Rating.findByPk(req.params.id, {
      include: [{ model: User, as: "parent" }]
    })
    res.status(200).json(reviewData);
  }
  catch (err) {
    res.status(400).json(err);
  }
})
//user must be logged in to write a review, checked in insomnia
router.post('/', withAuth, async (req, res) => {
  console.log({
    ...req.body,
    user_id: req.session.user_id,
  })
  try {
    const newReview = await Rating.create({
      ...req.body,
      parent_id: req.session.user_id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
//when logged in user is able to update a review
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updateReview = await Rating.update({
      ...req.body,
      user_id: req.session.user_id,
    },
      {
        where: {
          id: req.params.id
        }
      })
    if (!updateReview[0]) {
      res.status(404).json({ message: "No Review found." })
      return
    }
    res.status(200).json(updateReview)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

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
