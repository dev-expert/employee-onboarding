const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employees', employeeSchema);

module.exports = Employee;
