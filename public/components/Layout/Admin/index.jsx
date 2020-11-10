import React, { useState, useEffect, useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { auth } from "../../../../firebase/firebase.utils";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";

import NavSlider from "../../Navigation/NavSlider";

import NavTop from "../../Admin/NavTop/index";

import { DashboardContext } from "../../../shared/Context/Context";

const Layout = (props) => {
  const router = useRouter();

  const { setAccess } = useContext(DashboardContext);

  const [statusLogin, setStatusLogin] = useState(false);

  const signOut = async () => {
    await auth
      .signOut()
      .then(function () {
        setAccess(false);
        console.log("logout success");
        localStorage.removeItem("currentUser");
        router.push({ pathname: "/admin", query: { status: "logout" } });
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  useEffect(() => {
    if (_.isEmpty(localStorage.getItem("currentUser"))) {
      router.push("/admin");
    } else {
      setStatusLogin(true);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{props.title}</title>
      </Head>

      <div className="min-h-screen h-full  w-full bg-bgGrayLight px-2 xl:px-5 py-5 lg:py-10 ">
        {statusLogin ? (
          <div className=" w-full h-full lg:h-auto  max-w-screen-xxl shadow-xl flex flex-col xl:flex-row mx-auto  overflow-hidden rounded-xxl bg-white py-5 xl:py-10 px-2 xl:px-10 ">
            <NavSlider signOut={signOut} />
            <div className="w-full h-auto  mt-0 px-5 xl:px-10 ">
              <NavTop title={props.navTopTitle} signOut={signOut} />
              {props.children}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center ">
            <LoadingOutlined className="text-6xl mr-6" />
            <span>Loding....</span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Layout;
