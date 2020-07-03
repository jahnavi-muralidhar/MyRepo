const authorize = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {Employee, validate} = require('../models/employee');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', authorize, async (req, res) => {
  const employee = await Employee.findById(req.employee.id).select('-password');
  res.send(employee);
});

//Adding new joinees to the db 
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let employee = await Employee.findOne( {email : req.body.email });
  if(employee) res.status(400).send('Employee already exists');

  employee = new Employee(_.pick(req.body, ['name','email','password']));
  const salt = await bcrypt.genSalt(10);
  employee.password = await bcrypt.hash(employee.password,salt);
  await employee.save();

  const token = employee.generateAuthToken();
  res.header('x-auth-token',token).send(_.pick(employee, ['name','email']));
});

//Get all employees
router.get('/', async (req, res) => {
    const employees = await Employee.find().sort('name');
    res.send(employees);
  });

// Get by id
router.get('/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id);
  
    if (!employee) return res.status(404).send('The employee with the given ID was not found.');
  
    res.send(employee);
  });

module.exports = router;