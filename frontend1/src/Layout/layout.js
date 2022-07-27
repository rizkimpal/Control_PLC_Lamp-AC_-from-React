/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/style-prop-object */
import React from "react";
import HeaderClassroomControl from "../component/Header/header";
import Control_IoT from "../component/Lampu_IoT";

function Layout_IoT() {
  return (
    <>
      <div className="flex fixed bg-gray-400">
      {process.env.REACT_API_NUC_GET}
        <HeaderClassroomControl />
        <section className="relative w-fit h-fit pt-28 min-h-screen">
          <Control_IoT />
        </section>
      </div>
    </>
  );
}

export default Layout_IoT;
