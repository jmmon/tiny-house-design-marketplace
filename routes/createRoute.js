const express = require('express');
const router = express.Router();
const Design = require('../models/design');

router.route("/").post((req, res) => {
    console.log('create router working');

    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const length = req.body.length;
    const width = req.body.width;
    const height = req.body.height;
    const creator;

    const newDesign = new Design({
        name,
        imageUrl,
        description,
        length,
        width,
        height,
        creator,
    })

    newDesign.save()
    .then(() => {
        res.send(200);
    })
    .catch(err => {
        console.log(err);
        res.send(500);
    });
});

module.exports = router;