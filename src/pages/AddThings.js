import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Stores from "../components/Stores";
import { firestore } from "../firebase";

export default function AddThings() {
  const codeId = useParams().id;
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    firestore
      .collection("allUsers")
      .doc(codeId)
      .get()
      .then((e) => {
        setCurrentUser(e.data());
      });
  }, [codeId]);

  function handleSubmit(e) {
    e.preventDefault();
    var productData = {
      name: e.target.productName.value,
      antal: parseFloat(e.target.qty.value),
      price: parseFloat(e.target.price.value),
      totalPrice: parseFloat(
        parseFloat(e.target.price.value) * parseFloat(e.target.qty.value)
      ),
    };

    currentUser?.listOfItems?.push(productData);

    firestore
      .collection("allUsers")
      .doc(codeId)
      .set(currentUser)
      .then(() => navigate(`/dashboard/${codeId}/indkobsliste`));
  }
  return (
    <div>
      <Link to={`/dashboard/${codeId}`}>Tilbage</Link>

      <h1>Tilføj til indkøbslisten</h1>

      <Stores />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div style={{ marginBottom: "1em" }}>
          <label>Produkt Navn:</label>
          <input required type="text" name="productName" />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="antal">Antal:</label>
          <input required type="tel" name="qty" />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <label htmlFor="antal">pris pr styk:</label>
          <input required type="tel" name="price" />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <input type="submit" value={"Tilføj"} />
        </div>
      </form>
    </div>
  );
}
