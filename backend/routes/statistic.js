const router = require('express').Router();
let Statistic = require('../models/statistic.model');

router.route('/').get((req,res) =>{ 
    Statistic.find() //find all, i.e. show all
    .then(statistic => res.json(statistic))
    .catch(err=> res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) =>{
    
    const score_ratio = req.body.score_ratio;

    const newStatistic = new Statistic({
        score_ratio
    });

    newStatistic.save() //store new statistic
    .then(() => res.json('Statistic added!'))
    .catch(err=> res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res)=>{
    Statistic.findById(req.params.id)
    .then(statistic=>res.json(statistic))
    .catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/date/:date').get((req,res)=>{
    Statistic.find({date: req.params.date})
    .then(statistic=>res.json(statistic))
    .catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=>{
    Statistic.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Statistic deleted.'))
    .catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/date/:date').delete((req,res)=>{
    Statistic.find({date: req.params.date})
    .then(()=>res.json('Statistic deleted.'))
    .catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res)=>{
    Statistic.findById(req.params.id)
    .then(statistic =>{
        statistic.score_ratio = Number(req.body.duration);
        statistic.date = Date.parse(req.body.date);

        statistic.save()
        .then(()=>res.json('Statistic updated!'))
        .catch(err=>res.status(400).json('Error: ' + err));
    })
    .catch(err=>res.status(400).json('Error: ' + err));
});


module.exports = router;