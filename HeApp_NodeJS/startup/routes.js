const express = require('express');
const employees = require('../routes/employees');

module.exports = function () {
    app.use(express.json());
    app.use('/api/employees', employees);
    app.use('/api/auth', auth);
    app.use(error);
}