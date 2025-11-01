const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const jwt = require('jsonwebtoken');


// Signup route
router.post('/signup', async (req, res) => {
    try {
        // create a new user document
        // console.log(req.body);


        const existinguser = await User.findOne({ email: req.body.email });

        try {
            if (existinguser) {
                return res.status(500).json({ error: 'email already exists' });

            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const newUser = new User({
                _id: new mongoose.Types.ObjectId(), // add ()
                name: req.body.name,
                age: req.body.age,
                email: req.body.email,
                password: hashedPassword,
            });


            // save the user to the database
            const response = await newUser.save();

            console.log(response);

            res.status(200).json({ response: response });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }

});





router.post('/login', (req, res) => {

    console.log(req.body);

    User.findOne({ email: req.body.email })

        .then(User => {
            console.log(User);

            if (!User) {
                return res.status(401).json({ msg: 'user does not exist' })
            }

            bcrypt.compare(req.body.password, User.password, (err, result) => {

                if (!result) {
                    return res.status(401).json({ msg: 'invalid password' })
                }


                //creating token

                const token = jwt.sign({

                    name: User.name,
                    age: User.age,
                    email: User.email,
                    Userid: User._id,

                },

                    'abc-19', { expiresIn: 8000 })



                res.status(200).json({
                    msg:'login successfull',
                    name: User.name,
                    age: User.age,
                    email: User.email,
                    Userid: User._id,
                    token: token


                })
            })
        })


        .catch(err => {
            console.log(err);
        })
})

module.exports = router
