import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { firestore } from "../firebase";

export default function LogInSites() {
  const [allCodes, setAllCodes] = useState([]);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUserContext);

  function logIn(e) {
    if (e.target.value.length === 4) {
      firestore
        .collection("allUsers")
        .get()
        .then((data) => {
          setAllCodes(data.docs);
          const findCode = data.docs?.find((id) => id?.id === e?.target?.value);

          console.log(findCode);
          if (findCode === undefined) {
            alert("Koden findes ikke");
            document.querySelector(".code").value = "";
          } else {
            navigate(`/dashboard/${e.target.value}`);
            setCurrentUser(findCode.data());
            console.log(findCode.data());
          }
        });
    }
  }

  return (
    <div>
      <h2>Hop ind og se din indkøbsliste </h2>
      <form>
        <div>
          <label htmlFor="kode">Din kode:</label>
          <input className="code" onChange={(e) => logIn(e)} type="tel" />
        </div>
      </form>
      <p>
        har du ikke en kode? lav en <Link to={"/signUp"}>her!</Link>
      </p>
    </div>
  );
}
