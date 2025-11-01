const express = require('express');
const router = express.Router()

const Category = require('../models/category');

const mongoose = require('mongoose');


const middleware = require('../jwt/middleware');

const jwt = require('jsonwebtoken');

router.post('/', middleware, async (req, res) => {




    try {
        // const title = await Category.findOne({ title: req.body.title });

        // if (title) {
        //     return res.status(500).json({ error: 'title cannot repeat' })
        // }


        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19');

        console.log(req.body);



        const newcategory = new Category({
            _id: new mongoose.Types.ObjectId(),
            Userid: verify.Userid,
            title: req.body.title,
            imageurl: req.body.imageurl
        })

        const response = await newcategory.save();

        console.log(response);

        res.status(200).json({ response: response });

    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }


})


//get all category


router.get('/', middleware, async (req, res) => {

    try {

        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19');

        const allcategory = await Category.find({ Userid: verify.Userid });

        console.log(allcategory);

        return res.status(200).json({ allcategory: allcategory })



    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


//delete category

router.delete('/:id', middleware, async (req, res) => {

    try {
        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19');

        console.log(verify)

        const deletecategory = await Category.deleteOne({ _id: req.params.id, Userid: verify.Userid });

        console.log(deletecategory);

        if (deletecategory.deletedCount == 0) {
            return res.status(401).json({ msg: 'something is wrong' });
        }
        res.status(200).json({ msg: 'data deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

})



router.put('/:id', middleware, async (req, res) => {


    try {
        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19');

        console.log(verify)


       
            const update = await Category.find({ _id: req.params.id, Userid: verify.Userid })

            console.log(update);

            if (update.length == 0) {

                return res.status(404).json({ msg: 'something is wrong' })
            }
        



        const updatecategory = await Category.findOneAndUpdate({ _id: req.params.id, Userid: verify.Userid }, {


            $set: {

                Userid: verify.Userid,
                title: req.body.title,
                imageurl: req.body.imageurl
            }
        })
        console.log(updatecategory)


        res.status(200).json({updatecategory:updatecategory });
        
        // res.status(200).json({ msg: 'data updated successfully' });

    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });

    }

})
module.exports = router;