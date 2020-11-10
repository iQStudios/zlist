import { motion } from "framer-motion";

import { pathVariants, svgVariants } from "../../shared/animateEffect";

export default function checkSuccess(props) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.w}
      height={props.h}
      variants={svgVariants}
      initial="hidden"
      animate="visible"
      viewBox="0 0 100 100"
    >
      <motion.path
        variants={pathVariants}
        d="M 43 3 C 65.091 3 83 20.909 83 43 C 83 65.091 65.091 83 43 83 C 20.909 83 3 65.091 3 43 C 3 20.909 20.909 3 43 3 Z"
        fill="transparent"
        strokeWidth="5"
        stroke="#35B34A"
      ></motion.path>
      <motion.path
        variants={pathVariants}
        transition={{ delay: 0.5 }}
        d="M 31 44 L 38.5 51.5 L 55 35"
        fill="transparent"
        strokeWidth="5"
        stroke="#35B34A"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></motion.path>
    </motion.svg>
  );
}
