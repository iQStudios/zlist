import React from "react";

import { motion } from "framer-motion";

import InputList from "./InputList";

export default function HomeIndex(props) {
  const pageTransition = props.pageTransition;
  const storeDati = props.storeDati;
  const fadeInUp = props.fadeInUp;
  const stagger = props.stagger;
  const handSubmit = props.handSubmit;
  const validCheck = props.validCheck;
  const dati = props.dati;
  const onChange = props.onChange;
  const valid = props.valid;
  const openModal = props.openModal;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit={{ opacity: 0, x: -1000, scale: 0.3 }}
      variants={pageTransition}
      transition={{ duration: 1 }}
      className="max-w-xl w-full z-40"
    >
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: 200, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-auto h-24  bg-contain bg-no-repeat bg-center mx-auto"
        style={{
          backgroundImage: `url(${storeDati.logo_photo} )`,
        }}
      />
      <motion.h2
        variants={fadeInUp}
        className="mt-6 break-all text-center text-2xl md:text-3xl leading-9 font-extrabold text-gray-900 capitalize"
      >
        {storeDati.name}
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8  py-10 px-5 rounded-xl shadow-xl bg-white"
        onSubmit={handSubmit}
      >
        <InputList
          onChange={onChange}
          validCheck={validCheck}
          fadeInUp={fadeInUp}
          dati={dati}
          stagger={stagger}
          storeDati={storeDati}
        />
        <div className="flex flex-wrap -mx-3">
          <motion.div
            variants={fadeInUp}
            className=" flex items-center px-3 py-3 md:py-0"
          >
            <label htmlFor="toogleA" className="flex items-center ">
              <div className="relative w-10 h-6  cursor-pointer">
                <input
                  id="toogleA"
                  type="checkbox"
                  className="hidden w-10 h-6"
                  name="accept_privacy"
                  value={dati.accept_privacy === "on" ? "" : "on"}
                  onChange={onChange}
                />
                <div
                  className={`${
                    validCheck
                      ? _.isEmpty(dati.accept_privacy)
                        ? " bg-red-400"
                        : ""
                      : ""
                  } toggle__line w-10 h-6 bg-gray-200 rounded-full shadow-inner `}
                ></div>
                <div className=" toggle__dot absolute mx-2 mt-2 inset-y-0 left-0 w-4 h-4  bg-white rounded-full shadow inset-x-0 bottom-0"></div>
              </div>
            </label>
            <div className="ml-3 font-medium text-xs ">
              Ho letto e accetto{" "}
              <strong
                className="font-medium text-blueLight cursor-pointer"
                onClick={openModal}
              >
                l'informativa sulla privacy
              </strong>
            </div>
          </motion.div>
          <div className="w-full px-3 mt-5">
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              type="submit"
              className="mx-auto bg-blueLight text-white font-medium text-base py-4 rounded-lg w-full uppercase"
            >
              Invio
            </motion.button>
            <motion.p
              variants={fadeInUp}
              className={`${
                valid ? "text-red-500" : "text-gray-600"
              } text-xs italic mt-3`}
            >
              * Tutti i campi sono obbligatori
            </motion.p>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}
