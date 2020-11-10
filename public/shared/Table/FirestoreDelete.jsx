import { firestore } from "../../../firebase/firebase.utils";

const oneDelete = async (id) => {
  return await firestore.collection("covidListClient").doc(id).delete();
};

const manyDelete = (id) => {
  async function deleteQueryBatch(db, collectionPath, id) {
    const collectionRef = db.collection(collectionPath);

    // Delete documents in a batch
    const batch = db.batch();
    id.forEach((key) => {
      batch.delete(collectionRef.doc(key));
    });
    console.log("Eliminazione multipla funz");
    return await batch.commit();
  }
  return deleteQueryBatch(firestore, "covidListClient", id);
};

export { oneDelete, manyDelete };
