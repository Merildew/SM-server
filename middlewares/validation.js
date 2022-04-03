const Users = require("../models/Users");

const validation = async (req, res, next) => {
  const { login, firstName, lastName, age, pass, checkedPass } = req.body;

  let errors = { message: "Invalid form data" };
  if (!(login && firstName && lastName && age && pass && checkedPass)) {
    errors = {
      ...errors,
      emptyFields: "All fields must be filled in ",
    };
    return res.status(400).json({ errors });
  }
  const query = await Users.findOne({ where: { login: login } });
  if (query) {
    errors = {
      ...errors,
      login: "Such login already exists",
    };
  }
  if (login.length < 3) {
    errors = {
      ...errors,
      login: "Login must contain 3 symbols or more",
    };
  }
  if (pass.length < 4) {
    errors = {
      ...errors,
      pass: "Password must contain 4 symbols or more",
    };
  }
  if (pass.match(/\d/) === null || pass.match(/[a-zA-Z]/) === null) {
    errors = {
      ...errors,
      pass: "Password must contain at least 1 number and 1 letter",
    };
  }
  if (pass !== checkedPass) {
    errors = {
      ...errors,
      checkedPass: "Wrong password",
    };
  }
  if (firstName.length < 3) {
    errors = {
      ...errors,
      firstName: "First name must contain 3 symbols or more",
    };
  }
  if (lastName.length < 3) {
    errors = {
      ...errors,
      lastName: "Last name must contain 3 symbols or more",
    };
  }
  if (isNaN(Number(age)) && age != 0) {
    errors = {
      ...errors,
      age: "Age must be a number",
    };
  }

  console.log(Object.keys(errors).length);
  if (Object.keys(errors).length > 1) {
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = validation;
