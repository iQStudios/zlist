import React from "react";

import { motion } from "framer-motion";

export default function Footer(props) {
  return (
    <motion.div className="w-full mx-auto py-5 ">
      <motion.p
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: 100, opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1.2 }}
        className="text-sm uppercase text-center text-gray-600 "
      >
        DESIGNED BY{" "}
        <motion.a
          variants={props.fadeInUp}
          href="https://www.facebook.com/sensen.ma"
          className="hover:underline"
        >
          <strong className="text-blueLight">MARK MA</strong>
        </motion.a>
      </motion.p>
    </motion.div>
  );
}
