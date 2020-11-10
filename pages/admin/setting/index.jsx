import { useState, useEffect, useMemo } from "react";

import { useRouter } from "next/router";
import { firestore } from "../../../firebase/firebase.utils";
import _ from "lodash";

import Layout from "../../../public/components/Layout/Admin/index";

import { ComponentsChange } from "../../../public/components/Admin/Setting/ComponentsChange";

const Setting = () => {
  const router = useRouter();

  const [storeInfo, setStoreInfo] = useState("");

  useEffect(() => {
    const ubsubscribe = () => {
      firestore.collection("info_store").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setStoreInfo({
            ...doc.data(),
            id: doc.id,
          });
        });
      });
    };
    return ubsubscribe();
  }, []);

  const { edit } = router.query;

  const componentChange = ComponentsChange(edit, storeInfo);

  return (
    <Layout title="impostazioni" navTopTitle="impostazioni">
      {componentChange && componentChange}
    </Layout>
  );
};

export default Setting;
