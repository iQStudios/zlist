import React, { useState } from "react";

import Header from "../Header/index";
import Footer from "../Footer/index";
import { motion } from "framer-motion";

import { fadeInUp } from "../../shared/animateEffect";

const footerDati = {
  logoImg: "../img/logo.png",
  email: "RISTORANTEPECHINO.COMO@GMAIL.COM",
  name_business: "RISTORANTE PECHINO SAS",
  p_iva: "05310380968",
};

export default function Layout(props) {
  return (
    <React.Fragment>
      <div className=" min-h-screen h-full w-full bg-bgGrayLight justify-center flex flex-col items-center overflow-hidden px-5 py-5">
        {props.children}
      </div>
    </React.Fragment>
  );
}
