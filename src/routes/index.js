const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    const registers = await pool.query('SELECT * FROM registers WHERE user_id = ? LIMIT 10', [req.user.id]);
    const balance = await pool.query('SELECT SUM(if(type ="income", amount, 0)) AS income, SUM(if(type ="outgoing", amount ,0)) AS outgoing, SUM(if(type="income",amount,-1*amount)) AS balance FROM registers WHERE user_id = ?', [req.user.id]);
    const balanceResult = balance.map(({ balance }) => balance);
    res.render('index', { registers, balanceResult } );
});

module.exports = router;