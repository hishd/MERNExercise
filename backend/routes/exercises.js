const router = require('express').Router()
let Exercise = require('../models/exercise-model')

router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.route('/add').post((req, res) => {
    const userName = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({
        userName,
        description,
        duration,
        date,
    })

    newExercise.save()
    .then(exercise => res.json({message: 'Exercise added!', data: exercise}))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json({message: 'Exercise Deleted'}))
    .catch(error => res.status(400).json('Error: ' + error))
})

router.route('/update/:id').put((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.userName = req.body.username
        exercise.description = req.body.description
        exercise.duration = Number(req.body.duration)
        exercise.date = Date.parse(req.body.date)

        exercise.save()
        .then(exercise => res.json({message: 'Exercise udpated!', data: exercise}))
        .catch(error => res.status(400).json('Error: ' + error))
    })
    .catch(error => res.status(400).json('Error: ' + error))
})

module.exports = router