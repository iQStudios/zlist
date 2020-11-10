import React, { useState } from "react";

import InputCustom from "../../../../Input/Input";

import { motion } from "framer-motion";

export default function InputList(props) {
  const dati = props.dati;

  const inputList = [
    {
      id: 1,
      name: "name",
      dati: dati.name,
      type: "text",
      label: "Nome store",
      placeholder: "Nome",
      maskValid: false,
      w: "max-w-xl",
    },
    {
      id: 2,
      name: "qytPeople",
      dati: dati.qytPeople,
      type: "number",
      label: "Seleziona quantita persone",
      placeholder: "Persone",
      maskValid: false,
      w: "max-w-xl",
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-wrap -mx-3 justify-center">
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
      </div>
      {/* Select */}
    </React.Fragment>
  );
}
