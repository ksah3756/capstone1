const router = require('express').Router();
let Data = require('../models/data.model');

router.route('/').get((req,res) =>{
    Data.find()
    .then(data => res.json(data))
    .catch(err=> res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) =>{
    const score = req.body.score;
    const part_name = req.body.part_name;

    const newData = new Data({
        score,
        part_name,
    });

    newData.save()
    .then(() => res.json('Data added!'))
    .catch(err=> res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res)=>{
    Data.findById(req.params.id)
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/score/:score').get((req,res)=>{
    Data.find({score: req.params.score})
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/date/:date').get((req,res)=>{
    Data.find({date: req.params.date})
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=>{
    Data.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Data deleted.'))
    .catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/date/:date').delete((req,res)=>{
    Data.find({date: req.params.date})
    .then(()=>res.json('Data deleted.'))
    .catch(err=>res.status(400).json('Error: ' + err));
});

module.exports = router;