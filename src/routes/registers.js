const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('registers/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { concept, amount, type} = req.body;
    const newRegister = {
        concept,
        amount,
        type,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO registers set ?', [newRegister]);
    req.flash('success', 'Register Saved Successfully');
    res.redirect('/registers');
});

router.get('/', isLoggedIn, async (req, res) => {
    const registers = await pool.query('SELECT * FROM registers WHERE user_id = ?', [req.user.id]);
    res.render('registers/list', { registers });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM registers WHERE ID = ?', [id]);
    req.flash('success', 'Register Removed Successfully');
    res.redirect('/registers');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const registers = await pool.query('SELECT * FROM registers WHERE id = ?', [id]);
    res.render('registers/edit', {register: registers[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { concept, amount} = req.body; 
    const newRegister = {
        concept,
        amount
    };
    await pool.query('UPDATE registers set ? WHERE id = ?', [newRegister, id]);
    req.flash('success', 'Register Updated Successfully');
    res.redirect('/registers');
});

router.get('/income', isLoggedIn, async (req, res) => {
    const registers = await pool.query('SELECT * FROM registers WHERE user_id = ? AND type = "income"', [req.user.id]);
    res.render('registers/income', { registers });
});

router.get('/outgoing', isLoggedIn, async (req, res) => {
    const registers = await pool.query('SELECT * FROM registers WHERE user_id = ? AND type = "outgoing"', [req.user.id]);
    res.render('registers/outgoing', { registers });
});

module.exports = router;