const config = require('./config');

const express = require('express');

const loaders = require('./loaders');

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  }).on('error', err => {
    console.log(err);
    process.exit(1);
  });

}

startServer();