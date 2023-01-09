const normalizePort = (value) => {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    return value;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const checkEmptyValues = (keys, userKeys) => {
  const listOfValues = [];

  for (var [key, value] of Object.entries(keys)) {
    for (var k in userKeys) {
      if (key === k) continue;
      else {
        if (value === "") {
          listOfValues.push({
            parameter: key,
            status: "empty",
          });
        }
      }
    }
  }

  return listOfValues;
};

const upperCase = (value) => (value !== "" ? value.toUpperCase() : value);

module.exports = {
  normalizePort,
  checkEmptyValues,
  upperCase,
};
