import React, { useState, useEffect } from "react";

import InputCustom from "../Input/Input";
import emailMask from "text-mask-addons/dist/emailMask";

import { numberPhoneMask } from "../../shared/settingFuncion";

import { isEmpty } from "lodash";
import { motion } from "framer-motion";

export default function InputList(props) {
  const dati = props.dati;

  const [optionGroup, setOptionGroup] = useState([]);

  useEffect(() => {
    const optionGroup = [];
    for (let i = 0; i < props.storeDati.qytPeople; i++) {
      optionGroup.push({
        values: i + 1,
      });
    }
    setOptionGroup(optionGroup);
  }, []);

  const inputList = [
    {
      id: 1,
      name: "fName",
      dati: dati.fName,
      type: "text",
      label: "Nome",
      placeholder: "Nome",
      maskValid: false,
      w: "md:w-1/2",
    },
    {
      id: 2,
      name: "lName",
      dati: dati.lName,
      type: "text",
      label: "Cognome",
      placeholder: "Cognome",
      maskValid: false,
      w: "md:w-1/2",
    },
    {
      id: 3,
      name: "email",
      dati: dati.email,
      type: "text",
      label: "Email",
      placeholder: "Inserisci indirizzo email",
      maskValid: true,
      mask: emailMask,
      w: "",
    },
    {
      id: 4,
      name: "phone",
      dati: dati.phone,
      type: "text",
      label: "Numero di telefono",
      placeholder: "Numero di telefono",
      maskValid: true,
      mask: numberPhoneMask,
      w: "md:w-1/2",
    },
  ];

  return (
    <React.Fragment>
      <motion.div className="flex flex-wrap -mx-3 ">
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
        <div className="w-full md:w-1/2 px-3">
          <motion.label
            variants={props.fadeInUp}
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-people"
          >
            Persone
          </motion.label>
          <motion.div variants={props.fadeInUp} className="relative">
            <select
              className={`${
                props.validCheck
                  ? isEmpty(dati.qytPeople)
                    ? "focus:border-gray-500 border-red-400"
                    : "border-green-400"
                  : ""
              } appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none `}
              id="grid-people"
              name="qytPeople"
              onChange={props.onChange}
            >
              <option>Seleziona quantita persone</option>
              {optionGroup.map((item) => (
                <option key={item.values} value={item.values}>
                  {item.values} Persone
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Select */}
    </React.Fragment>
  );
}
