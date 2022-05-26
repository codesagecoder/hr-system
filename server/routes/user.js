const router = require("express").Router();
const jwt = require('jsonwebtoken')
const User = require("../models/User");
const Employee = require("../models/Employee");


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).send({ message: "User was not found" })
        user.comparePassword(req.body.password, async (match) => {
            if (!match) return res.status(400).send({ message: "Incorrect credentials." })

            let accessToken = jwt.sign({ username: user.username, role: user.role, _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '20d',
            });

            if (user.role == 'admin') {
                res.status(200).json({ accessToken, isAdmin: true })
            } else {
                // const result = await Employee.findOne({ email: user.username });

                // if (result) {
                res.status(200).json({
                    accessToken,
                    isAdmin: false,
                    // firstName: result.firstName,
                    // lastName: result.lastName,
                    // email: result.email,
                    // telNumber: result.telNumber,
                    // status: result.status,
                })
                // }
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'failed' })
    }

})

module.exports = router