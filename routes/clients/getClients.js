"use strict";

module.exports = (req, res) => {
  let host = req.params.host;
  res.status(200).send(host);
};
