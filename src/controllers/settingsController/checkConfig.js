"use strict";

module.exports = (req, res) => {
  let settings = {
    host: req.body.host,
    database: req.body.database,
    username: req.body.username,
    password: req.body.password,
    port: req.body.port,
  };

  res.status(200).send({
    payload: settings,
  });
};
