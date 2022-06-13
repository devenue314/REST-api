const router = require('express').Router();
const tokenChecker = require('./tokenChecker');

router.get('/', tokenChecker, (req, res) => {
    res.json({
        post: {
            title: "Test post #1",
            body: "Hello, world. This is post #1."
        }
    })
})

module.exports = router;