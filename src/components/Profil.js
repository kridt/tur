import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Profil() {
  const { currentUser } = useContext(CurrentUserContext);
  const [user] = useState(currentUser);
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
