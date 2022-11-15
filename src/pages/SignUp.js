import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "../firebase";

export default function SignUp() {
  const [errorDigits, setErrorDigits] = useState(false);
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

  function checkFor4Digits(e) {
    const findCode = allCodes.find((code) => code.id === e.target.value);

    if (e.target.value.length !== 4) {
      setErrorDigits(true);
    } else {
      if (findCode === undefined) {
        setErrorDigits(false);
      } else {
        alert("Koden er allerede i brug");
        document.querySelector(".code").value = "";
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (errorDigits === false) {
      firestore
        .collection("allUsers")
        .doc(e.target.code.value)
        .set({
          telefon: e.target.phone.value,
          name: e.target.name.value,
          code: e.target.code.value,
          listOfItems: [],
        })
        .then(() => navigate("/"));
    } else {
      alert("Der skete en fejl, prøv igen");
    }
  }
  return (
    <div>
      <h2>Lav kode her!</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Fulde navn: </label>
          <input required type="text" name="name" />
        </div>
        <br />
        <div>
          <label>Telefonnummer:</label>
          <input type="tel" name="phone" />
        </div>
        <br />
        <div>
          <label>Vælg din 4 cifrede kode</label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "200px",
            }}
          >
            <br />
            {errorDigits ? (
              <span style={{ color: "red" }}>Din kode skal være 4 cifre</span>
            ) : (
              <></>
            )}
            <input
              type="tel"
              name="code"
              className="code"
              required
              onChange={(e) => checkFor4Digits(e)}
            />
          </div>
        </div>

        <br />
        <br />
        <br />
        <input type="submit" value="Opret" />
      </form>
      <p>
        Har du allerede en kode? kom tilbage <Link to={"/"}>Her</Link>
      </p>
    </div>
  );
}
