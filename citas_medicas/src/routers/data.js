const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
    const data = req.body;
    const sql = 'INSERT INTO table_name SET ?'; 

    req.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(sql, data, (err, results) => {
            if (err) throw err;
            res.redirect('/'); 
        });
    });
});

module.exports = router;