const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    const registers = await pool.query('SELECT * FROM registers WHERE user_id = ? LIMIT 10', [req.user.id]);
    //const balance = await pool.query('select ((SELECT sum(amount) AS income FROM registers WHERE user_id = 1 AND type = "income") - (SELECT sum(amount) AS outgoing FROM registers WHERE user_id = 1 AND type = "outgoing")) as totalAmount', [req.user.id], [req.user.id]);
    res.render('index', { registers } );
});

module.exports = router;