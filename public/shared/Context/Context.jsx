import React, { useState, createContext } from "react";

import { useRouter } from "next/router";
import moment from "moment";

export const DashboardContext = createContext();

const Storage = (user) => {
  localStorage.setItem(
    "currentUser",
    user
      ? JSON.stringify({ user, createDate: moment(new Date()).format() })
      : []
  );
};

const DashboardContextProvider = ({ children }) => {
  const router = useRouter();

  const mail = process.env.NEXT_PUBLIC_VALID_MAIL;

  const [userData, setUserData] = useState([]);
  const [access, setAccess] = useState(false);

  const getUser = (user) => {
    setUserData(user ? JSON.parse(localStorage.getItem("currentUser")) : []);
  };

  const addUserData = (user) => {
    //Email da modificare per altri account
    if (user.email === mail) {
      console.log("Account giusto");
      Storage(user);
      getUser(user);
      setAccess(true);
      router.push(router.pathname + "/listClient");
    } else {
      setAccess(false);
      console.log("Accesso negato");
    }
  };
  const contentValues = {
    userData,
    access,
    setAccess,
    addUserData,
    getUser,
  };

  return (
    <DashboardContext.Provider value={contentValues}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
