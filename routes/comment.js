
const express = require('express');
const router = express.Router()

const Comment = require('../models/comments');

const mongoose = require('mongoose');


const middleware = require('../jwt/middleware');

const jwt = require('jsonwebtoken');
const { update } = require('lodash');



// new commment

router.post('/', middleware, async (req, res) => {


    try {

        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19')
        console.log(verify)



        const newcomment = new Comment({


            _id: new mongoose.Types.ObjectId(),


            Userid: verify.Userid,
            userName: verify.name,
            comment: req.body.comment,
            blogId: req.body.blogId



        })

        const response = await newcomment.save();
        console.log(response)


        res.status(200).json({ response: response })
    }



    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

})



// update comment

router.put('/:id', middleware, async (req, res) => {


    try {

        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19')


        console.log(verify)


        const update = await Comment.find({ _id: req.params.id, Userid: verify.Userid })

        console.log(update)

        if (update.length == 0) {

            res.status(404).json({ msg: 'something is wrong' })

        }


        const updatecomment = await Comment.findOneAndUpdate({ _id: req.params.id, Userid: verify.Userid }, {



            $set: {
                Userid: verify.Userid,
                userName: verify.name,
                blogId: req.body.blogId,
                comment: req.body.comment


            }

        })
        console.log(updatecomment)




        res.status(200).json({ updatecomment: updatecomment })

    }


    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})



//delete comment


router.delete('/:id', middleware, async (req, res) => {

    try {
        const token = req.headers.authorization.split(" ")[1]

        const verify = jwt.verify(token, 'abc-19');

        console.log(verify)

        const deletecomment = await Comment.deleteOne({ _id: req.params.id, Userid: verify.Userid });

        console.log(deletecomment);

        if (deletecomment.deletedCount == 0) {
            return res.status(401).json({ msg: 'something is wrong' });
        }
        res.status(200).json({ msg: 'data deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

})




//get comment for any blog

router.get('/getallcomment/:blogId',async(req,res)=>{
  
    
    
        try {
    
            const getallcommentbyid = await  Comment.find({ categoryId: req.params.id })
    
            console.log(getallcommentbyid)
    
            res.status(200).json({getallcommentbyid:getallcommentbyid})
        }
    
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    
})
module.exports = router
