import React, { useEffect, useState } from "react";

import { storage } from "../../../../../../firebase/firebase.utils";

export function UpdateImg(image) {
  const [newDati, setNewDati] = useState([]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const uploadTask = storage.ref(`storeLogo/logo.jpg`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setNewDati(downloadURL);
        });
      }
    );
  }, []);

  return { newDati, progress };
}
