async function plcControl(sum){
    console.log(`PLC CONTROL => connect Done with ${sum} inside class`);
    let bodyLamp = {};
    let bodyAc = {};
    if (sum  === 0) {
      bodyLamp = {
        lampu1: 0,
        lampu2: 0,
        lampu3: 0,
        lampu4: 0,
        lampu5: 0,
        lampu6: 0,
      };
      bodyAc = {
        ac1: 0,
        ac2: 0,
      };
    } else if (sum <= 3 && sum > 0) {
      bodyLamp = {
        lampu1: 0,
        lampu2: 1,
        lampu3: 1,
        lampu4: 1,
        lampu5: 1,
        lampu6: 0,
      };
      bodyAc = {
        ac1: 0,
        ac2: 1,
      };
    } else if (sum > 3) {
      bodyLamp = {
        lampu1: 1,
        lampu2: 1,
        lampu3: 1,
        lampu4: 1,
        lampu5: 1,
        lampu6: 1,
      };
      bodyAc = {
        ac1: 1,
        ac2: 1,
      };
    }
    // console.log("Body Lamp", bodyLamp);
    //Control AC
    fetch(process.env.NUC_POST_AC_API, { // api NUC Server for control AC  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyAc),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`PLC AC ROOM RESPONSE=>`, data);
      })
      .catch((error) => console.log(error));
    //Control Lamp
    fetch(process.env.NUC_POST_LAMP_API, { // api NUC Server for control AC 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyLamp),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`PLC LAMP ROOM RESPONSE=>`, data);
      })
      .catch((error) => console.log(error));
  };

  module.exports = { plcControl }