import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import moment from "moment";
import { firestore } from "../../../../../../firebase/firebase.utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, stagger } from "../../../../../shared/animateEffect";
import _ from "lodash";
import { CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import InputList from "./inputList";

function createPrivacy(dati) {
  return firestore.collection("privacy").add(dati);
}
function updatePrivacy(dati) {
  return firestore.collection("privacy").doc(dati.id).update(dati);
}

export default function Privacy(props) {
  const router = useRouter();
  const [dati, setDati] = useState({});

  const [validCheck, setValidCheck] = useState(false);

  const [sendStatus, setSendStatus] = useState("");

  useEffect(() => {
    return firestore.collection("privacy").onSnapshot((snapshot) => {
      snapshot.forEach((item) => {
        setDati({
          ...item.data(),
          id: item.id,
        });
      });
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSendStatus(false);
    }, 2000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [sendStatus]);

  function formValid() {
    if (_.isEmpty(dati.title) || _.isEmpty(dati.content)) {
      console.log("Non invia dati");
    } else {
      // newClient(dati);
      if (_.isEmpty(dati.id)) {
        createPrivacy(dati);
        setSendStatus("create success");
      } else {
        updatePrivacy(dati);
        setSendStatus("update success");
      }
      console.log("invia dati");
      console.log(dati);
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

  return (
    <React.Fragment>
      <motion.div animate="animate" initial="initial">
        <motion.button
          variants={fadeInUp}
          className="p-3 rounded-full bg-white shadow-3xl inline-flex items-center focus:outline-none"
          onClick={() => router.push(router.pathname)}
        >
          <ArrowLeftOutlined />
        </motion.button>
        <motion.div
          variants={fadeInUp}
          className="flex items-center mb-5 h-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-openSans font-semibold  mr-5 uppercase"
          >
            {props.title}
          </motion.h2>

          {sendStatus && (
            <AnimatePresence>
              <motion.span
                variants={fadeInUp}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 2 }}
                className=" px-5 py-2 bg-green-100 text-sm font-openSans font-bold ml-auto capitalize text-green-500 rounded-full "
              >
                <CheckOutlined className="text-xl mr-2 " />
                {sendStatus}
              </motion.span>
            </AnimatePresence>
          )}
        </motion.div>
        <motion.form variants={stagger} onSubmit={handSubmit}>
          <InputList
            onChange={onChange}
            validCheck={validCheck}
            dati={dati}
            fadeInUp={fadeInUp}
            stagger={stagger}
          />

          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            type="submit"
            className="mx-auto bg-blueLight text-white font-medium text-base py-4 rounded-lg w-full uppercase"
          >
            {_.isEmpty(dati) ? "crea" : "salva"}
          </motion.button>
        </motion.form>
      </motion.div>
    </React.Fragment>
  );
}
