const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectRedis = require('connect-redis');
const routes = require('../api');
const config = require('../config');
const morgan = require("../config/morgan");


module.exports = ({ app, redisClient }) => {

  const RedisStore = connectRedis(session);


  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // We have to change this for front end applications
  app.use(cors());

  // Bodyparser
  app.use(express.urlencoded({ extended: false }));

  // Transforms the raw string of req.body into json
  app.use(express.json());

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: config.sessionSecret,
      saveUninitialized: false,
      resave: false,
      name: 'sessionId',
      cookie: {
        // Change this in production
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30,
      }
    })
  )
  if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }



  app.use(config.api.prefix, routes());



  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {

    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};