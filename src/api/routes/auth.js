const express = require('express');
const AuthService = require('../../services/auth');
const middlewares = require('../middlewares');
const authService = new AuthService();
const { emailFormatValid,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  minLength,
  maxLength
} = require('../../helpers/validators');

const router = express.Router();
module.exports = (app) => {
  app.use('/auth', router);

  //Signup
  router.post(
    '/signup',
    async (req, res, next) => {
      const { name, email, password } = req.body;
      try {
        if (!name || !email || !password) {
          throw { status: 400, message: 'One of the required fields is missing' }
        }
        if (!emailFormatValid(email)) {
          throw { status: 400, message: 'Email is not valid' }
        }
        if (!minLength(password, PASSWORD_MIN_LENGTH) || !maxLength(password, PASSWORD_MAX_LENGTH)) {
          throw { status: 400, message: `The password should be between ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} chars` }
        }
        const newUser = await authService.SignUp({ name, email, password })
        newUser.password = undefined;
        res.status(201).json(newUser);
        //return res.status(201)
      }
      catch (e) {
        console.log('error:', e);
        return next(e);
      }
    },
  );

  //Signin
  router.post(
    '/signin',
    async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const user = await authService.SignIn(email, password);
        req.session.userId = user._id.toString();
        res.status(200).json("You are logged in")
      } catch (e) {
        console.log('error:', e);
        return next(e);
      }
    }
  );


  router.post('/logout', middlewares.isAuth, async (req, res, next) => {
    try {
      await req.session.destroy();
      res.clearCookie('sessionId');
      return res.status(200).send('logout successful');
    } catch (e) {
      return next(e);
    }
  });
};