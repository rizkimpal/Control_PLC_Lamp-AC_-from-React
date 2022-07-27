const getData = require("./control/getData");
const plcControl = require("./control/plcControl");
const dotenv = require('dotenv');
dotenv.config();

let jumlah = 0;
async function countControl() {
  getData(jumlah);
  plcControl(jumlah);
}

setInterval(countControl, 1000) 