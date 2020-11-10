import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import moment from "moment";
import { firestore, storage } from "../../../../../../firebase/firebase.utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, stagger } from "../../../../../shared/animateEffect";
import _ from "lodash";
import InputList from "./inputList";
import {
  ArrowLeftOutlined,
  LoadingOutlined,
  CheckOutlined,
} from "@ant-design/icons";

function updateStore(dati) {
  // console.log(dati);
  return firestore.collection("info_store").doc(dati.id).update(dati);
}

const WebSite = ({ storeDati }) => {
  const router = useRouter();

  const [dati, setDati] = useState(storeDati);
  const [validCheck, setValidCheck] = useState(false);
  const [img, setImg] = useState([]);
  const [progress, setProgress] = useState({
    progress: 0,
    loading: false,
  });
  const [sendStatus, setSendStatus] = useState({
    title: "",
    status: false,
  });
  useEffect(() => {
    return firestore.collection("info_store").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        setDati({
          ...doc.data(),
          id: doc.id,
        });
      });
    });
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSendStatus((prevalue) => {
        return {
          ...prevalue,
          status: false,
        };
      });
    }, 2000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [sendStatus]);

  const newStore = async (dati) => {
    // console.log(dati);
    await firestore.collection("info_store").add(dati);
  };

  const handUpdateImg = () => {
    const uploadTask = storage.ref(`storeLogo/logo.jpg`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        if (progress === 100) {
          setProgress((prevalue) => {
            return {
              ...prevalue,
              progress: 0,
              loading: false,
            };
          });
        } else {
          setProgress((prevalue) => {
            return {
              ...prevalue,
              progress: progress,
              loading: true,
            };
          });
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        const newDati = [];
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          newDati.push({
            ...dati,
            logo_photo: downloadURL,
          });
          if (_.isEmpty(dati.id)) {
            newStore(newDati[0]);
          } else {
            updateStore(newDati[0]);
          }
        });
      }
    );
  };

  function formValid() {
    if (
      _.isEmpty(dati.name) ||
      _.isEmpty(dati.logo_photo) ||
      _.isEmpty(dati.qytPeople)
    ) {
      console.log("Non invia dati");
      console.log(dati);
    } else {
      if (_.isEmpty(dati.id)) {
        handUpdateImg();
        setSendStatus((prevalue) => {
          return {
            ...prevalue,
            title: "Creato con successo",
            status: true,
          };
        });
        console.log("New Create");
      } else {
        if (_.isArray(img)) {
          updateStore(dati);
          setSendStatus((prevalue) => {
            return {
              ...prevalue,
              title: "Aggiornato con successo",
              status: true,
            };
          });
          console.log("update");
        } else {
          handUpdateImg();
          console.log("update with img");
        }
        setSendStatus((prevalue) => {
          return {
            ...prevalue,
            title: "Aggiornato con successo",
            status: true,
          };
        });
      }

      // console.log(dati);
    }
  }

  const imgHandler = (e) => {
    const { files } = e.target;
    const imgFile = files[0];
    setImg(imgFile);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDati((preValue) => {
          return {
            ...preValue,
            logo_photo: reader.result,
          };
        });
      }
    };
    if (imgFile && imgFile.type.match("image.*")) {
      reader.readAsDataURL(imgFile);
    }
  };

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
          <motion.h2 className="text-2xl font-openSans font-semibold capitalize mb-5">
            MODIFICA NEGOZIO
          </motion.h2>
          {sendStatus.status && (
            <AnimatePresence>
              <motion.span
                variants={fadeInUp}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 2 }}
                className=" px-5 py-2 bg-green-100 text-sm font-openSans font-bold ml-auto capitalize text-green-500 rounded-full "
              >
                <CheckOutlined className="text-xl mr-2 " />
                {sendStatus.title}
              </motion.span>
            </AnimatePresence>
          )}
        </motion.div>
        <motion.form
          variants={stagger}
          onSubmit={handSubmit}
          className="flex flex-col justify-center "
        >
          <div className="mb-10">
            <motion.div
              variants={fadeInUp}
              className={`${
                dati.logo_photo ? "bg-contain" : "bg-cover"
              } w-24 h-24 xl:h-32 xl:w-32 rounded-full border-4 bg-clip-content p-1 border-blueLight  bg-center bg-no-repeat mx-auto`}
              style={{
                backgroundImage: `url(${dati.logo_photo})`,
              }}
            />
            <div className="flex w-full items-center justify-center mt-5 ">
              <motion.label
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.6 }}
                className=" flex flex-col items-center px-8 py-3 bg-blueLight text-white rounded-md tracking-wide uppercase  cursor-pointer hover:shadow-xl "
              >
                <span className=" text-base leading-normal capitalize">
                  change
                </span>
                <input
                  type="file"
                  className="hidden"
                  name="logo_photo"
                  onChange={imgHandler}
                  accept="image/*"
                />
              </motion.label>
            </div>
          </div>
          <InputList
            onChange={onChange}
            validCheck={validCheck}
            dati={dati}
            fadeInUp={fadeInUp}
            stagger={stagger}
            imgHandler={imgHandler}
          />
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            type="submit"
            disabled={progress.loading ? true : false}
            className={`${
              progress.loading
                ? "cursor-not-allowed bg-gray-300 text-white"
                : "bg-blueLight text-white"
            } mx-auto  font-medium text-base py-4 rounded-lg w-full max-w-xl uppercase`}
          >
            {progress.loading ? (
              <span className="inline-flex items-center justify-center">
                <LoadingOutlined className="text-2xl mr-4" /> Loading
              </span>
            ) : _.isEmpty(dati) ? (
              "crea"
            ) : (
              "salva"
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </React.Fragment>
  );
};

export default WebSite;
