import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { firestore } from "../firebase";
import ListeComponents from "./ListeComponents";

export default function Indkobsliste() {
  const [listOfItems, setListOfItems] = useState([]);
  const codeId = useParams().id;
  const [nothing, setNothing] = useState(false);
  const [totalPrice, setTotalPrice] = useState([]);
  const leveringsGebyr = 30;

  useEffect(() => {
    firestore
      .collection("allUsers")
      .doc(codeId)
      .get()
      .then((e) => {
        setListOfItems(e.data().listOfItems);

        if (e.data().listOfItems.length === 0) {
          setNothing(true);
        } else {
          setNothing(false);

          setTotalPrice(
            listOfItems.reduce((partialSum, a) => partialSum + a.totalPrice, 0)
          );
        }
      });
  }, [codeId, totalPrice, listOfItems]);

  return (
    <div>
      <h2>indkøb</h2>

      {nothing ? (
        <>
          <p>Du har ikke ting på indkøbslisten</p>
        </>
      ) : (
        <>
          <p>Du har ting på indkøbslisten</p>
          <div style={{ backgroundColor: "grey" }}>
            {listOfItems?.map((item) => {
              return (
                <ListeComponents
                  name={item.name}
                  price={item.price}
                  antal={item.antal}
                  key={`${item.name + item.antal + item.price}`}
                />
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 1em",
            }}
          >
            <p>Levering/bro gebyr: </p>
            <p>{leveringsGebyr} Kr</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 1em",
            }}
          >
            <p>Total: </p>
            <p>{totalPrice + leveringsGebyr} Kr</p>
          </div>
        </>
      )}

      <Link to={`/addThings/${codeId}`}>Tilføj noget til indkøbsliten</Link>
    </div>
  );
}
