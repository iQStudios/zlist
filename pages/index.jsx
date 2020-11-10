import React, { useState, useEffect, useMemo } from "react";

import Link from "next/link";
import getConfig from "next/config";

import { useRouter } from "next/router";
import Head from "next/head";

import _ from "lodash";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

import { firestore } from "../firebase/firebase.utils";

import Layout from "../public/components/Layout/index";

import { fadeInUp, stagger, easing } from "../public/shared/animateEffect";

import Footer from "../public/components/Footer/index";

import CheckSuccess from "../public/img/SVG/checkSuccess";
import ModalCustom from "../public/components/Home/Modal";

import HomeIndex from "../public/components/Home/index";

function newClient(dati) {
  return firestore.collection("covidListClient").add(dati);
}

const Home = ({ storetData, privacyData }) => {
  const router = useRouter();

  const [storeInfo, setStoreInfo] = useState([storetData[0]]);
  const [privacy, setPrivacy] = useState(privacyData);

  const [dati, setDati] = useState([]);

  const [validCheck, setValidCheck] = useState(false);
  const [valid, setValid] = useState(false);
  const [show, setShow] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  function formValid() {
    if (
      _.isEmpty(dati.fName) ||
      _.isEmpty(dati.lName) ||
      _.isEmpty(dati.phone) ||
      _.isEmpty(dati.email) ||
      _.isEmpty(dati.qytPeople) ||
      _.isEmpty(dati.accept_privacy)
    ) {
      setValid(true);
    } else {
      setValid((control) => !control);
      setShow((show) => !show);
      newClient(dati);
    }
  }

  const handSubmit = (e) => {
    e.preventDefault();
    setValidCheck(true);
    formValid();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setDati((preValue) => {
      return {
        ...preValue,
        [name]: value.toLowerCase(),
        create_date: moment(new Date()).format(),
      };
    });
  };

  const pageTransition = {
    animate: {
      transition: {
        type: "tween",
        duration: 1,
        when: "beforeChildren",
        staggerChildren: 0.4,
      },
    },
  };

  const modalToogle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const infoStore = () => {
      firestore.collection("info_store").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setStoreInfo([
            {
              ...doc.data(),
              id: doc.id,
            },
          ]);
        });
      });
      firestore.collection("privacy").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setPrivacy([
            {
              ...doc.data(),
              id: doc.id,
            },
          ]);
        });
      });
    };
    return infoStore();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Welcome to {storeInfo[0].name}</title>
      </Head>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          {show &&
            storeInfo.map((item) => (
              <HomeIndex
                key={item.id}
                pageTransition={pageTransition}
                fadeInUp={fadeInUp}
                storeDati={item}
                stagger={stagger}
                handSubmit={handSubmit}
                onChange={onChange}
                validCheck={validCheck}
                dati={dati}
                valid={valid}
                openModal={modalToogle}
              />
            ))}
        </AnimatePresence>
        {!show && (
          <React.Fragment>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.3,
                x: 0,
                position: "absolute",
              }}
              animate={{ opacity: 1, scale: 1.0, x: 0, position: "relative" }}
              transition={{
                duration: 0.5,
                delay: 1,
                type: "spring",
                mass: 1,
                ease: "easeInOut",
                staggerChildren: 0.04,
              }}
              className=" bg-white w-full  md:w-2/5 flex flex-col pt-20 py-10 items-center  rounded-xxl shadow-2xl "
            >
              <CheckSuccess h="100" w="100" />
              <motion.p className="text-center text-3xl capitalize">
                successful
              </motion.p>
              <motion.p
                transition={{ delay: 2 }}
                className="text-center text-2xl text-gray-500 py-3 mb-5"
              >
                Registrato con successo
              </motion.p>
              <motion.button
                transition={{ delay: 2 }}
                className="text-xl text-white bg-blueLight w-3/4 py-3 rounded-full"
                onClick={() => router.reload()}
              >
                Close
              </motion.button>
            </motion.div>
          </React.Fragment>
        )}
        <Footer fadeInUp={fadeInUp} />
      </Layout>
      <ModalCustom isOpen={isOpen} modalToogle={modalToogle} data={privacy} />
    </React.Fragment>
  );
};

export async function getStaticProps(context) {
  const storetData = [];
  const privacyData = [];

  const storeInfoRes = await firestore.collection("info_store").get();
  storeInfoRes.forEach((doc) => {
    storetData.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  const privacyRes = await firestore.collection("privacy").get();
  privacyRes.forEach((doc) => {
    privacyData.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  if (_.isEmpty(storetData)) {
    storetData.push({
      id: 1,
      name: "nome ristorante / negozio",
      logo_photo: "./img/logo.png",
    });
  }

  return {
    props: {
      storetData,
      privacyData,
    },
  };
}
export default Home;
