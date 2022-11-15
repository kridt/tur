import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { firestore } from "../firebase";

export default function Profil() {
  const { currentUser } = useContext(CurrentUserContext);
  const [user, setUser] = useState(currentUser);
  const codeId = useParams().id;
  /* useEffect(() => {
    firestore
      .collection("allUsers")
      .doc(codeId)
      .get()
      .then((e) => {
        setUser(e.data());
      });
    }, [codeId]); */

  console.log(currentUser);
  return (
    <div>
      <h2>profil</h2>

      <div>
        <p>Navn: {user.name}</p>
        <p>telefonnummer: {user.telefon}</p>
        <p>Kode: {user.code}</p>
      </div>
    </div>
  );
}
