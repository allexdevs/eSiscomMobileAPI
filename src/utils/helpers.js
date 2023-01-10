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
    if (!value) {
      listOfValues.push({
        parameter: key,
      });
    }
  }

  const checkedKeys = listOfValues.filter((key, index) => {
    return key.parameter !== userKeys[index] ? key.parameter : null;
  });

  console.log(checkedKeys);

  return checkedKeys;
};

const removeMask = (value) =>
  value !== "" ? value.replace(/[a-z]|[A-Z]|[?!@$%&*|\\/#]/g, "") : null;

const upperCase = (value) => (value !== "" ? value.toUpperCase() : value);

module.exports = {
  normalizePort,
  checkEmptyValues,
  upperCase,
  removeMask,
};
