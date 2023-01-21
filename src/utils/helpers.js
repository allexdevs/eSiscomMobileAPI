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

const createDate = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let fullDate = new Date(year, month, day);
  return fullDate;
};

const createTime = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  let fullTime = new Date(year, month, day, hour, minute, second);
  return fullTime;
};

module.exports = {
  normalizePort,
  checkEmptyValues,
  upperCase,
  removeMask,
  createDate,
  createTime,
};
