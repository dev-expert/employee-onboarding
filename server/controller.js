const Employee = require('./employee-schema');
const Admin = require('./admin_schema');
const mailService = require('./util/mailService');

const createEmployee = async ({ name, email, about, age }) => {
  const p = await new Employee({
    name,
    email,
    about,
    age,
  }).save();
  return p;
};

const getEmployees = async () => {
  const employees = await Employee.find({});
  return employees;
};

const getEmployee = async (email) => {
  const employee = await Employee.find({email});
  return employee;
};

const deleteEmployee = async (id) => {
  const res = await Employee.deleteOne({ _id: id });
  return res;
};

const updateEmployee = async ({ _id, email, name, age, about }) => {
  const res = await Employee.findOneAndUpdate(
    { _id },
    { email, name, age, about },
    { upsert: true },
    function (err, doc) {}
  );

  return res;
};

const sendMail = ({ name, email }) => {
  const mail = {
    to: email,
    subject: 'Employee Emboarding',
    text: `Hii ${name}, you are now emboarded with us`,
  };
  mailService.sendMail(mail);
};

const signupAdmin = async ({ email, password, userName }) => {
  const p = await new Admin({
    username: userName,
    password,
    email,
  }).save();
  return p;
};
const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.find({ email, password });
  return admin;
};
module.exports = {
  createEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
  signupAdmin,
  loginAdmin,
  getEmployee,
  sendMail,
};
