const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    employeeId: {
        type: int,
        required: true,
      },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1000
    },
    Gender: {
        type: String
    },
    Designation: {
        type: String
    },
    MobileNumber: {
        type: String
    },
    isActive : {
        type: Boolean
    },
    DateOfJoin: {
        type: Date
    },
    IsSupervisor: {
        type: Boolean
    },

});

employeeSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({id : this._id}, config.get('jwtSecretKey'));
    return token;
}
const Employee = mongoose.model('Employee', employeeSchema);

function validateEmployee(employee) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
      };  
  
    return Joi.validate(employee, schema);
  }

  exports.Employee = Employee;
  exports.validate = validateEmployee;