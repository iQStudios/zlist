import React from "react";

import Link from "next/link";

import { useRouter } from "next/router";

import { motion } from "framer-motion";

import { fadeInUp, stagger } from "../../../shared/animateEffect";

import GDPRIcon from "../../../img/SVG/gdpr";
import QRCODEIcon from "../../../img/SVG/qrCode";

export default function SettingIndex({ profile }) {
  const router = useRouter();
  let urlElements = window.location.href.split("/");

  return (
    <motion.div
      animate="animate"
      initial="initial"
      variants={stagger}
      className="flex w-full flex-col  flex-wrap "
    >
      <motion.div className=" h-full w-full lg:w-2/3 max-w-xl mx-auto">
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.5 }}
          className="bg-white cursor-pointer  rounded-xl w-full  shadow-2xl px-4 py-2 my-5 "
        >
          <Link
            href={{
              pathname: router.pathname,
              query: { edit: "privacy" },
            }}
            passHref
          >
            <div className="flex flex-wrap items-center justify-center lg:justify-start ">
              <div className=" mr-5 w-20 h-24 xl:w-32 ">
                <GDPRIcon w="100%" h="100%" />
              </div>
              <ul className=" flex flex-col my-4  break-all w-auto">
                <li className="flex-1">
                  <h5 className="text-lg lg:text-xl font-openSans font-semibold capitalize text-gray-700">
                    GDPR + PRIVACY
                  </h5>
                </li>
                <li className="flex-1">
                  <p className=" text-gray-400 text-sm xl:text-base">
                    Modifica i contenuti per <strong>Privacy</strong> e{" "}
                    <strong>GDPR</strong>
                  </p>
                </li>
                <li className="flex-1 relative">
                  <a className=" text-base text-blueLightMenu ">Edit</a>
                </li>
              </ul>
            </div>
          </Link>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.5 }}
          className="bg-white cursor-pointer  rounded-xl w-full  shadow-2xl px-4 py-2 my-5 "
        >
          <Link
            href={{
              pathname: router.pathname,
              query: { edit: "printQrCode" },
            }}
            passHref
          >
            <div className="flex flex-wrap items-center justify-center lg:justify-start ">
              <div className=" mr-5 w-20 h-24 xl:w-32 ">
                <QRCODEIcon w="100%" h="100%" />
              </div>
              <ul className=" flex flex-col my-4 break-all w-64 xl:w-auto">
                <li className="flex-1">
                  <h5 className="text-lg lg:text-xl font-openSans font-semibold capitalize text-gray-700">
                    QRCode
                  </h5>
                </li>
                <li className="flex-1">
                  <p className=" text-gray-400 text-sm xl:text-base break-all">
                    Scarica il codice QR per la registrazione clienti
                  </p>
                </li>
                <li className="flex-1 relative">
                  <a className=" text-base text-blueLightMenu ">Stampa</a>
                </li>
              </ul>
            </div>
          </Link>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.5 }}
          className="bg-white cursor-pointer  rounded-xl w-full  shadow-2xl px-4 py-2 my-5 "
        >
          <Link
            href={{
              pathname: router.pathname,
              query: { edit: "store" },
            }}
            passHref
          >
            <div className="flex flex-wrap items-center justify-center lg:justify-start ">
              <ul className=" flex flex-col my-4 break-all   lg:w-64 xl:w-auto">
                <li className="flex-1">
                  <h5 className="text-lg lg:text-xl font-openSans font-semibold capitalize text-gray-700">
                    Impostazioni store
                  </h5>
                </li>
              </ul>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
