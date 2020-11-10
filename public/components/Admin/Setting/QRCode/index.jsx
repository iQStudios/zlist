import React, { useRef, useEffect } from "react";
import Head from "next/head";

import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";

import GeneratorQR from "qrcode.react";

import { LoadingOutlined } from "@ant-design/icons";
import { firestore } from "../../../../../firebase/firebase.utils";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className="p-10">
        <GeneratorQR
          value={this.props.value.link}
          size={250}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"Q"}
          includeMargin={false}
          renderAs={"svg"}
          imageSettings={{
            src: `${this.props.logo}`,
            x: null,
            y: null,
            height: 60,
            width: 60,
            excavate: true,
          }}
        />
      </div>
    );
  }
}
const singlePrint = (props) => {
  const storeDati = props.storeDati;

  const router = useRouter();
  let urlElements = window.location.href.split("/");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => router.replace(router.pathname),
  });
  useEffect(() => {
    handlePrint();
  }, []);

  const dataPrint = {
    link: "https://" + urlElements[2] + "/",
  };

  return (
    <React.Fragment>
      <Head>
        <title>Print!</title>
      </Head>
      <div className=" min-h-full h-full flex flex-row justify-center items-center  z-40 pt-40 ">
        <LoadingOutlined
          style={{ fontSize: "5em", color: "black" }}
          className="text-center relative"
        />
      </div>
      <div className="opacity-0 z-10 ">
        <ComponentToPrint
          ref={componentRef}
          value={dataPrint}
          logo={storeDati.logo_photo}
        />
      </div>
    </React.Fragment>
  );
};

export default singlePrint;
