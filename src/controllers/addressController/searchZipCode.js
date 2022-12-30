/* global process */
"use strict";
const fetch = require("node-fetch");
const VIA_CEP_URL = process.env.VIA_CEP_URL;

module.exports = async (req, res) => {
  let dados = {
    uf: req.query.uf,
    city: req.query.city,
    public_place: req.query.public_place,
  };

  const searchZipCode = async () => {
    const request = await fetch(
      `${VIA_CEP_URL}/${dados.uf}/${dados.city}/${dados.public_place}/json`
    );
    const response = await request.json();
    return response;
  };

  searchZipCode()
    .then((responseData) => {
      const results = responseData.map((value) => {
        return {
          zipCode: value.cep,
          public_place: value.logradouro,
          complemment: value.complemento,
          district: value.bairro,
          city: value.localidade,
          uf: value.uf,
        };
      });

      res.status(200).send({
        status: "success",
        params: dados,
        payload: results,
      });
    })
    .catch((error) => {
      res.status(400).send({
        status: "error",
        params: dados,
        error: error,
      });
    });
};
