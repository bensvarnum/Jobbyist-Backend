const express = require('express')
const router = express.Router();
const { login, register } = require('../controllers/user.js')

router.post("/login", login);

router.post("/register", register)

router.get("/profile", (req, res) => {
    res.send('userinfo')
})

module.exports = router;