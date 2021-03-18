const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');
const Design = require('../models/design');
const User = require('../models/user');


router.post("/create", checkAuth, (req, res) => {
    console.log('create router working');

    // const creator = req.body.creator;

    const newDesign = new Design({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
        creator: req.userData.userId,
    });

    newDesign.save()
    .then((design) => {
        console.log('new saved design', design);
        res.json(design);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Error saving design"
        });
    });
});


router.route('/:id').get((req, res) => {
    console.log('GET design router working');

    Design.find({_id: req.params.id})
    .then(design => {
        res.status(200).json({
            message: "Found design",
            design: design
        });
        console.log('~design found', design);
    })
    .catch(err => {
        res.status(404).json({
            message: "Design not found!",
        });
        console.log(err);
    });

});

router.route('/').get((req, res) => {
    console.log('GET browse router working');

    Design.find()
    .then(designs => {
        console.log('~all designs', designs);
        if (designs) {
            res.status(200).json(
                designs
            );
        } else {
            res.status(404).json({ message: "Design not found!"});
        }
    })
    .catch(err => {
        console.log(err);
    });

});

module.exports = router;