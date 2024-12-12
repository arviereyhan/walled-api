const Joi = require("joi");
const userService = require("../services/users.services");

const schema = Joi.object({
  user_email: Joi.string().email().required(),
  user_password: Joi.string().required(),
  user_name: Joi.string().required(),
  user_number: Joi.string().required(),
});

const loginSchema = Joi.object({
    user_email: Joi.string().email().required(),
    user_password: Joi.string().required(),
  });

const createUsers = async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const user = await userService.createUser(value);
    res.status(201).json({ data: {user_id: user.user_id, user_email: user.user_email, user_name: user.user_name} });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message, });
  }
};

const getUsers = async (req, res) => {
    try {
        const user = await userService.getUsers(req.body)
        res.status(201).json({ data: user });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
  };

  const login = async (req, res) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json(error.details[0].message);
      }
      const isValid = await userService.login(value);
      res.status(201).json({ data: isValid });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message, });
    }
  };

module.exports = { createUsers, getUsers,login };
