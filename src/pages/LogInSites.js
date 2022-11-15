import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { firestore } from "../firebase";

export default function LogInSites() {
  const [allCodes, setAllCodes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    firestore
      .collection("allUsers")
      .get()
      .then((e) => {
        setAllCodes(e.docs);
      });
  }, []);

  function logIn(e) {
    if (e.target.value.length === 4) {
      const findCode = allCodes.find((id) => id.id === e.target.value);

      if (findCode === undefined) {
        alert("Koden findes ikke");
        document.querySelector(".code").value = "";
      } else {
        navigate(`/dashboard/${e.target.value}`);
      }
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
