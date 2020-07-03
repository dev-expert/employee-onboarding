const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { generateAccessToken, authenticateJWT } = require('./util/authService');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

const {
  createEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployee,
  signupAdmin,
  loginAdmin,
  sendMail,
} = require('./controller');
const mongoUri =
  'mongodb+srv://admin:pass123@cluster0.aulh1.mongodb.net/employees?retryWrites=true&w=majority';

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected…');
  })
  .catch((err) => console.log(err));

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS, PUT'
  );
  next();
});

app.get('/employees', authenticateJWT, async (req, res, next) => {
  console.log('token', req.headers.authorization);
  const response = await getEmployees();
  res.status(200).json({ employees: response });
});

app.get('/employees/:email', async (req, res, next) => {
  // const response = await getEmployees();
  const employee = await getEmployee(req.params.email);
  res.status(200).json(employee);
});

app.post('/employees', authenticateJWT, async (req, res, next) => {
  // writeToFile(employees);
  const { email, name } = req.body;

  const response = await createEmployee(req.body);
  sendMail({ email, name });

  res.status(201).json({ message: 'Created new employee.', data: response });
});

app.delete('/employees', authenticateJWT, async (req, res, next) => {
  // const { userName, password, age, gender } = req.body;c
  const { id } = req.body;

  const response = await deleteEmployee(id);
  res.status(204).json({ message: 'Deleted successfully' });
});

app.put('/employees', authenticateJWT, async (req, res, next) => {
  const response = await updateEmployee(req.body);
  res.status(204).json({ message: 'updated successfully' });
});

app.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const token = generateAccessToken(email);

  const result = await loginAdmin(req.body);
  if (result.length === 0) {
    res.status(201).json({
      message: 'Invalid username password',
      data: {},
    });
  } else {
    const doc = result[0]._doc;
    res.status(200).json({
      message: 'Login success',
      data: { ...doc, token },
    });
  }
});

app.post('/signup', async (req, res, next) => {
  try {
    const result = await signupAdmin(req.body);
    res.status(200).json({ message: 'Created new admin.', data: {} });
    // console.log('rsult', result);
  } catch (e) {
    res.status(204).json({ message: 'Creating new admin error', data: {} });
  }
});

app.listen(5002); // start Node + Express server on port 5000
