import React, { useEffect, useState } from "react";

import { isEmpty } from "lodash";

import SettingIndex from "./index";

import Privacy from "./Form/Privacy/Privacy";
import PrintQRCode from "./QRCode/index";
import Store from "./Form/Store/Store";

export function ComponentsChange(edit, storeDati) {
  const [component, setComponent] = useState([]);

  useEffect(() => {
    const check = (edit) => {
      if (edit === "privacy") {
        return setComponent(<Privacy title="modifica privacy  e gdpr" />);
      } else if (edit === "printQrCode") {
        return setComponent(<PrintQRCode storeDati={storeDati} />);
      } else if (edit === "store") {
        return setComponent(<Store storeDati={storeDati} />);
      }
    };
    if (!isEmpty(edit)) {
      check(edit);
    } else {
      return setComponent(<SettingIndex />);
    }
  }, [edit]);

  return component;
}
