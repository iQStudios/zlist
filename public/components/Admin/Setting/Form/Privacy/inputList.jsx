import React, { useState } from "react";

import InputCustom from "../../../../Input/Input";
import emailMask from "text-mask-addons/dist/emailMask";

import _ from "lodash";
import { motion } from "framer-motion";

export default function InputList(props) {
  const dati = props.dati;

  const inputList = [
    {
      id: 1,
      name: "title",
      dati: dati.title,
      type: "text",
      label: "Titolo",
      placeholder: "Titolo",
      maskValid: false,
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-wrap -mx-3 ">
        {inputList.map((item) => (
          <motion.div
            variants={props.fadeInUp}
            className={`${item.w} w-full px-3 mb-3`}
            key={item.id}
          >
            <InputCustom
              label={item.label}
              dati={item.dati}
              type={item.type ? item.type : "text"}
              placeholder={item.placeholder}
              name={item.name}
              mask={item.mask}
              maskValid={item.maskValid}
              onChange={props.onChange}
              validCheck={props.validCheck}
            />
          </motion.div>
        ))}
        <div className="w-full px-3 mb-3">
          <motion.label
            variants={props.fadeInUp}
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="message"
          >
            Contenuto privacy e GDPR
          </motion.label>
          <motion.textarea
            value={dati.content}
            variants={props.fadeInUp}
            name="content"
            placeholder="Inserisci i contenuti per PRIVACY e GDPR"
            className={`${
              props.validCheck
                ? _.isEmpty(dati.content)
                  ? " border-red-400 placeholder-red-300 "
                  : "border-green-400"
                : ""
            } appearance-none block w-full  focus:bg-white  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none h-64 resize-none`}
            id="message"
            onChange={props.onChange}
          />
        </div>
      </div>

      {/* Select */}
    </React.Fragment>
  );
}
