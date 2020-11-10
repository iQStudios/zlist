import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import LogoutIcon from "../../img/SVG/logout";

import {
  PieChartOutlined,
  SettingOutlined,
  ContainerOutlined,
  CloseOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    id: 1,
    title: "lista clienti",
    icon: "collection",
    link: "/listClient",
  },
  {
    id: 2,
    title: "impostazioni",
    icon: "setting",
    link: "/setting",
  },
];

export default function NavSlider(props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="w-full h-auto xl:w-2/6 xl:max-w-xs py-2 px-0  lg:px-2 z-50  ">
        <div className="h-16 px-2 lg:px-5 flex justify-between items-center  ">
          <img
            className=" h-12 w-auto"
            src="https://firebasestorage.googleapis.com/v0/b/testsiteweb-c6ae8.appspot.com/o/zlist%2Fzlist.svg?alt=media&token=90d1ea2d-7dc9-4dd7-86ee-d155af0adec3"
            alt="Workflow"
          />
          <button
            type="button"
            className="h-8 w-8 xl:hidden text-xl   inline-flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          }  xl:block h-0 xl:h-auto   w-full `}
        >
          <div className="bg-white pb-5  ">
            <ul
              className={`flex flex-col  justify-center items-center pb-3  lg:px-5  `}
            >
              {menuList.map((item) => (
                <li className=" w-full  my-3 " key={item.id}>
                  <Link href={"/admin" + item.link} passHref>
                    <a
                      className={`${
                        router.pathname === "/admin" + item.link
                          ? "bg-grayLight text-gray-900 active:text-gray-900 focus:text-gray-900 hover:text-gray-900"
                          : "text-gray-400 hover:text-gray-400"
                      } flex px-5  py-4 rounded-xl justify-center items-center text-center`}
                    >
                      <div className=" inline-flex items-center w-full ">
                        <span className=" ">{icon(item.icon)}</span>
                        <span className=" text-sm font-semibold xl:font-normal xl:text-lg font-openSans capitalize  ">
                          {item.title}
                        </span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
              <li className=" w-full  my-3 xl:hidden">
                <Link href={"/admin/"} passHref>
                  <a
                    className={`${"text-gray-400 hover:text-gray-400"} flex px-5  py-4 rounded-xl justify-center items-center text-center`}
                  >
                    <div className=" inline-flex items-center w-full ">
                      <span className="mr-5">{<LogoutIcon w="6" h="6" />}</span>
                      <span className=" text-sm font-semibold xl:font-normal xl:text-lg font-openSans capitalize  ">
                        Disconetti
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
            </ul>
            <div className="  h-auto w-full  font-openSans   ">
              <div className=" w-full  text-center xl:text-left   py-2  px-8 text-gray-400 break-all">
                <p className="text-2xl font-semibold">ZList.</p>
                <div className="flex flex-col  justify-center md:justify-start text-xs">
                  <span>
                    @ {moment(new Date()).format("YYYY")} iQStudios. All right
                    reserved.
                  </span>
                  <p>Ver. 1.0</p>
                  <p
                    className="font-semibold cursor-pointer text-lg text-blueLight"
                    onClick={() => console.log("Free")}
                  >
                    Versione Free
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const icon = (name) => {
  switch (name) {
    case "dashboard":
      return <PieChartOutlined className=" mr-4 text-2xl" />;
    case "collection":
      return <ContainerOutlined className=" mr-4 text-2xl" />;
    case "setting":
      return <SettingOutlined className=" mr-4 text-2xl" />;
    default:
      return null;
  }
};
