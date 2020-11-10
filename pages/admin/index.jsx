import React, { useEffect, useState, useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { LoadingOutlined, GoogleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { DashboardContext } from "../../public/shared/Context/Context";

export default function Admin() {
  const { addUserData, access, setAccess } = useContext(DashboardContext);

  const router = useRouter();

  const { status } = router.query;

  useEffect(() => {
    setAccess(access);
  }, [access, status]);

  const saveLogin = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        addUserData(user);
      }
    });
  };

  const login = () => {
    setAccess(!access);
    signInWithGoogle()
      .then(function (result) {
        saveLogin();
      })
      .catch(function (error) {
        setAccess(false);
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Head>
        <title> Login</title>
      </Head>
      <div className="z-10 w-full  mt-1/6 ">
        <div className="mx-auto flex flex-col  items-center">
          {access ? (
            <LoadingOutlined className=" text-9xl" />
          ) : (
            <React.Fragment>
              <motion.h2 className="text-5xl text-center font-semibold mb-5">
                Log in to Dashboard
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={login}
                className="px-8 py-4 mx-auto bg-gray-900 hover:bg-gray-700 focus:outline-none  text-white rounded-md  inline-flex items-center"
              >
                <GoogleOutlined className="mr-5" />
                Accendi con Google
              </motion.button>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
