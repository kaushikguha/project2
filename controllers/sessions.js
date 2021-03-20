const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users')



// USER NEW ROUTE
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser})
})

// USER LOGIN ROUTE (CREATE SESSION ROUTE)
router.post('/', (req, res) => {

    // look it up in the DB for a user that match req.body.username OK

    // if success - then compare the password
        // if success match - then login user and create session OK

        // if NOT Succes - send a message back to the browser "invalid password" OK

    // if NOT Succes - send a message back to the browser "user not found" OK


    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if (err) {
                res.send(err)
        }
        else {

            if (foundUser){
                console.log(foundUser)

                if (bcrypt.compareSync(req.body.password, foundUser.password)){
                    //login user and create session
                    req.session.currentUser = foundUser
                    console.log(req.session.currentUser)

                    res.redirect('/inventory')

                }
                else{
                    res.send("<h1>invalid password</h1>")
                }    

            }
            else{
                res.send("<h1>user not found</h1>")
            }
        }
    })
})


router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/sessions/new')
    })
})




module.exports = router;