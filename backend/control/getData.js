const fetch = require('node-fetch')

async function getData(sum) {
    fetch(process.env.NUC_GET_SUM_PEOPLE, { //api NUC server get counting people data
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        sum = data;
        console.log(data);
      })
      .catch((error) => console.log(error));
    console.log("ini " + sum);
  }
module.exports = { getData }