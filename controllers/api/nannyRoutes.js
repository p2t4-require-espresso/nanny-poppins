const router= require('express').Router()
const { User , Rating, Nanny} = require('../../models');
//CRUD FOR NANNY
//Get All Nannies
router.get('/', async (req, res) => {
    try {
        const nannyData = await Nanny.findAll({
            include: [{ model: User }, { model: Rating }],
        });
        res.status(200).json(nannyData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET a single Nanny
router.get('/:id', async (req, res) => {
    try {
        const nannyData = await Nanny.findbyPk(req.params.id, {
            include: [{ model: User}, { model: Rating}],
        });
        if (!nannyData) {
            res.status(404).json ({ message: ' No nanny found with that id'});
            return;
        }
        res.status(200).json(nannyData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//CREATE a nanny
router.post('/', async (req, res) => {
    try {
        const nannyData = await Nanny.create(req.body);
        res.status(200).json(nannyData);
    } catch (err) {
        res.status(400).json(err);
    }
});
//dont think we need a delete, right?

module.exports= router