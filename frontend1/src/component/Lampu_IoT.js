/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Helmet, HelmetProvider } from "react-helmet-async";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    opacity: "0.8",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "none",
    outline: "none",
    padding: "none",
  },
};
function Control_IoT() {
  const [ac1, setAc1] = useState(false);
  const [ac2, setAc2] = useState(false);
  const [lamp1, setLamp1] = useState(false);
  const [lamp2, setLamp2] = useState(false);
  const [lamp3, setLamp3] = useState(false);
  const [lamp4, setLamp4] = useState(false);
  const [lamp5, setLamp5] = useState(false);
  const [lamp6, setLamp6] = useState(false);
  const [reset, setReset] = useState(false);
  const [sum, setSum] = useState(0);
  const [hasBeenSet, sethasBeenSet] = useState(false);
  
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (hasBeenSet) buttonAc();
  }, [ac1, ac2]);
  useEffect(() => {
    if (hasBeenSet) buttonLampu();
  }, [lamp1, lamp2, lamp3, lamp4, lamp5, lamp6]);
  useEffect(() => {
    if (hasBeenSet) buttonReset();
  }, [reset]);

  useEffect(() => {
    setInterval(() => {
      getRoomStatus();
    }, 2000);
  }, []);

  async function getRoomStatus() {
    try {
      const result = await fetch(process.env.REACT_APP_NUC_GET); //api NUC server for getting room status
      const data = await result.json();
      setAc1(data[0] === 1 ? true : false);
      setAc2(data[1] === 1 ? true : false);
      setLamp1(data[2] === 1 ? true : false);
      setLamp2(data[3] === 1 ? true : false);
      setLamp3(data[4] === 1 ? true : false);
      setLamp4(data[5] === 1 ? true : false);
      setLamp5(data[6] === 1 ? true : false);
      setLamp6(data[7] === 1 ? true : false);
      setSum(data[8]); //counting people
      sethasBeenSet(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function buttonAc() {
    console.log("AC");
    let body = {
      ac1: ac1 === false ? 0 : 1,
      ac2: ac2 === false ? 0 : 1,
    };
    fetch(process.env.REACT_APP_NUC_POST_AC, { //api NUC server for control AC
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  async function buttonLampu() {
    let body = {
      lampu1: lamp1 === false ? 0 : 1,
      lampu2: lamp2 === false ? 0 : 1,
      lampu3: lamp3 === false ? 0 : 1,
      lampu4: lamp4 === false ? 0 : 1,
      lampu5: lamp5 === false ? 0 : 1,
      lampu6: lamp6 === false ? 0 : 1,
    };
    fetch(process.env.REACT_APP_NUC_POST_LAMP, { //api NUC server for control AC
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
  async function buttonReset() {
    let body = {
      But: 0,
    };
    fetch(process.env.REACT_APP_NUC_POST_RESET, { //api NUC server for Reset Button
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    setReset(false);
  }
  return (
    <>
      <div className="grid bg-gray-300 w-screen ">
        <HelmetProvider>
          <Helmet>
            <title>Control_IoT</title>
          </Helmet>
        </HelmetProvider>
        <div className="grid justify-items-center">
          <div className="grid w-3/4 box-border rounded-md h-24 p-4 my-5 bg-gray-800 text-center text-white text-3xl">
            {" "}
            Project IoT Simulator{" "}
          </div>
        </div>
        <div className=" justify-start ml-48">
          <button
            className={
              "rounded-lg w-48 h-14 align-middle " +
              (modalIsOpen ? "bg-gray-200" : "bg-red-500")
            }
            onClick={openModal}
          >
            <div className="grid justify-center">
              <div className=" text-2xl text-center"> this is CCTV </div>
            </div>
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <img
            src={process.env.REACT_APP_CCTV_RSTP} //api for CCTV RTSP protocol
            className="h-100"
            alt="..."
          ></img>{" "}
        </Modal>
        <div className="grid justify-center text-2xl font-sans font-bold text-violet-600">
          Jumlah orang: {sum}
        </div>
        <div className="grid grid-cols-3 justify-items-center text-2xl">
          <div className="grid grid-rows-3 gap-10 text-center mt-10">
            <button
              className={
                "rounded-md w-72 h-20 align-middle " +
                (!lamp3 ? " bg-gray-400" : " bg-yellow-500")
              }
              onClick={() => {
                setLamp3(!lamp3);
              }}
            >
              lampu3
            </button>
            <button
              className={
                "rounded-md w-72 h-20 align-middle " +
                (!lamp2 ? " bg-gray-400" : " bg-yellow-500")
              }
              onClick={() => {
                setLamp2(!lamp2);
              }}
            >
              lampu2
            </button>
            <button
              className={
                "rounded-md w-72 h-20 align-middle " +
                (!lamp1 ? " bg-gray-400" : " bg-yellow-500")
              }
              onClick={() => {
                setLamp1(!lamp1);
              }}
            >
              lampu1
            </button>
          </div>
          <div className="grid grid-rows-3 gap-20 py-10 text-center">
            <button
              className={
                "rounded-md w-72 h-40 align-middle " +
                (!ac2 ? " bg-gray-400" : " bg-yellow-500")
              }
              onClick={() => {
                setAc2(!ac2);
              }}
            >
              AC1
            </button>
            <button
              className={
                "rounded-md w-72 h-40 align-middle " +
                (!ac1 ? " bg-gray-400" : " bg-yellow-500")
              }
              onClick={() => {
                setAc1(!ac1);
              }}
            >
              AC2
            </button>
            <button
              className={
                "rounded-full w-72 h-20 align-middle bg-gray-200 hover:bg-red-800"
              }
              onClick={() => {
                setReset(!reset);
              }}
            >
              Reset
            </button>
          </div>

          <div className="grid grid-rows-3 gap-10 text-center text-2xl mt-10">
            <button
              className={
                "rounded-md w-72 h-20 align-middle " +
                (!lamp4 ? " bg-gray-400 " : " bg-yellow-500")
              }
              onClick={() => {
                setLamp4(!lamp4);
              }}
            >
              lampu4
            </button>
            <button
              className={
                "rounded-md w-72 h-20 align-middle " +
                (!lamp5 ? " bg-gray-400" : " bg-yellow-500")
              }
              onClick={() => {
                setLamp5(!lamp5);
              }}
            >
              lampu5
            </button>
            <button
              className={
                "rounded-md w-72 h-20 align-middle " +
                (!lamp6 ? " bg-gray-400" : " bg-yellow-500")
              }
              onClick={() => {
                setLamp6(!lamp6);
              }}
            >
              lampu6
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Control_IoT;
