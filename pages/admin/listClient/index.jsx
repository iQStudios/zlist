import React, { useState, useEffect } from "react";

import { firestore } from "../../../firebase/firebase.utils";

import { formatDistance } from "date-fns";

import Layout from "../../../public/components/Layout/Admin/index";
import TableData from "../../../public/components/Admin/Table/index";
import {
  oneDelete,
  manyDelete,
} from "../../../public/shared/Table/FirestoreDelete";

const ListClient = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const checkTime = (data) => {
      data.map((item) => {
        const dataFormat = formatDistance(
          new Date(),
          new Date(item.create_date)
        );
        const dataArray = dataFormat.split(" ");
        if (_.isNumber(parseInt(dataArray[0]))) {
          const day = parseInt(dataArray[0]);
          if (day >= 15) {
            console.log("e il 15 " + " " + item.create_date);
            oneDelete(item.key);
          }
        }
      });
    };

    const unsubscribe = () => {
      firestore
        .collection("covidListClient")
        .orderBy("create_date", "desc")
        .onSnapshot((snapshot) => {
          const data = [];
          snapshot.forEach((doc) => {
            data.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          setData(data);
          checkTime(data);
        });
    };

    return unsubscribe();
  }, []);

  return (
    <React.Fragment>
      <Layout title="Dashboard" navTopTitle="overview">
        <div className="my-5">
          <TableData
            dataCustom={data}
            oneDelete={oneDelete}
            manyDelete={manyDelete}
          />
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default ListClient;
