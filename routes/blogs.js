
const express = require('express');
const router = express.Router()

const Blog = require('../models/blog');

const mongoose = require('mongoose');


const middleware = require('../jwt/middleware');

const jwt = require('jsonwebtoken');


//add new blog


router.post('/', middleware, async (req, res) => {


    try {
        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19')

        console.log(verify);

        const newblog = new Blog({

            // _id: new mongoose.Types.ObjecId,
            _id: new mongoose.Types.ObjectId(),

            Userid: verify.Userid,
            title: req.body.title,
            imageurl: req.body.imageurl,
            categorytitle: req.body.categorytitle,
            categoryId: req.body.categoryId,
            blogDetail: req.body.blogDetail,
            userName: verify.name

        })

        const response = await newblog.save();

        console.log(response);

        res.status(200).json({ response: response });

    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


//get all blogs

router.get('/getallblogs', async (req, res) => {

    try {
        const allblogs = await Blog.find();

        console.log(allblogs);

        res.status(200).json({ allblogs: allblogs });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }


})

//get own blogs



router.get('/', middleware, async (req, res) => {

    try {

        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19')

        console.log(verify);


        const allblogslist = await Blog.find({ Userid: verify.Userid });

        console.log(allblogslist);

        res.status(200).json({ allblogslist: allblogslist });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }


})

//delete own blog


router.delete('/:id', middleware, async (req, res) => {

    try {
        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19');

        console.log(verify)

        const deleteblogs = await Blog.deleteOne({ _id: req.params.id, Userid: verify.Userid });

        console.log(deleteblogs);

        if (deleteblogs.deletedCount == 0) {
            return res.status(401).json({ msg: 'something is wrong' });
        }
        res.status(200).json({ msg: 'data deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

})

//update own blog




router.put('/:id', middleware, async (req, res) => {


    try {
        // console.log("body received",req.body);

        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19');

        console.log(verify)



        const update = await Blog.find({ _id: req.params.id, Userid: verify.Userid })

        console.log(update);

        if (update.length == 0) {

            return res.status(404).json({ msg: 'something is wrong' })
        }




        const updateblogs = await Blog.findOneAndUpdate({ _id: req.params.id, Userid: verify.Userid }, {


            $set: {

                Userid: verify.Userid,
                title: req.body.title,
                imageurl: req.body.imageurl,
                categorytitle: req.body.categorytitle,
                categoryId: req.body.categoryId,
                blogDetail: req.body.blogDetail,
                userName: verify.name
            }
        })
        console.log(updateblogs)


        res.status(200).json({ updateblogs: updateblogs });

        // res.status(200).json({ msg: 'data updated successfully' });

    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });

    }

})



//get blogs by category


router.get('/getbycategory/:id', async(req, res) => {


    try {

        const getallblogsbyid = await  Blog.find({ categoryId: req.params.id })

        console.log(getallblogsbyid)

        res.status(200).json({getallblogsbyid:getallblogsbyid})
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }


})
module.exports = router