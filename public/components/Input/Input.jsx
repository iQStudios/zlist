import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import MaskedInput from "react-text-mask";

export default function InputCustom({
  name,
  label,
  placeholder,
  onChange,
  type,
  mask,
  maskValid,
  validCheck,
  dati,
}) {
  return (
    <React.Fragment>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      {maskValid ? (
        <MaskedInput
          mask={mask}
          className={`${
            validCheck
              ? isEmpty(dati)
                ? " border-red-400 placeholder-red-300"
                : "border-green-400"
              : ""
          } appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none `}
          placeholder={placeholder}
          guide={true}
          id={name}
          name={name}
          onChange={onChange}
        />
      ) : (
        <input
          value={dati ? dati : ""}
          className={`${
            validCheck
              ? isEmpty(dati)
                ? " border-red-400 placeholder-red-300"
                : "border-green-400"
              : ""
          } appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none `}
          id={name}
          type={type ? type : "text"}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
      )}
    </React.Fragment>
  );
}
