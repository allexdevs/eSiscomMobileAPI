/* global process */
"use strict";
const fetch = require("node-fetch");
const VIA_CEP_URL = process.env.VIA_CEP_URL;

module.exports = async (req, res) => {
  let zipCode = req.query.zipCode;

  const checkAddressWithZipCode = async () => {
    const request = await fetch(`${VIA_CEP_URL}/${zipCode}/json`);
    const response = await request.json();
    return response;
  };

  checkAddressWithZipCode()
    .then((responseData) => {
      res.status(200).send({
        status: "success",
        params: zipCode,
        payload: {
          zipCode: responseData.cep,
          public_place: responseData.logradouro,
          complemment: responseData.complemento,
          district: responseData.bairro,
          city: responseData.localidade,
          uf: responseData.uf,
        },
      });
    })
    .catch((error) => {
      res.status(400).send({
        status: "error",
        params: zipCode,
        error: error,
      });
    });
};
