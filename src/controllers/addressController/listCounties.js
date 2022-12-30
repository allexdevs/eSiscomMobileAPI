/* global process */
"use strict";
const fetch = require("node-fetch");
const IBGE_API_URL = process.env.IBGE_API_URL;

module.exports = async (req, res) => {
  let uf = req.query.uf;

  const listCounties = async () => {
    const request = await fetch(
      `${IBGE_API_URL}/localidades/estados/${uf}/distritos`
    );
    const response = await request.json();
    return response;
  };

  listCounties()
    .then((responseData) => {

      const results = responseData.map((value) => {
        return {
          id: value.id,
          name: value.nome,
          uf: value.municipio.microrregiao.mesorregiao.UF.sigla,
          state: value.municipio.microrregiao.mesorregiao.UF.nome
        };
      });

      res.status(200).send({
        status: "success",
        params: uf,
        payload: results,
      });
    })
    .catch((error) => {
      res.status(200).send({
        status: "error",
        params: uf,
        error: error,
      });
    });
};
