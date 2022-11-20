import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";

export default function ShopList() {
  const [allPeople, setAllPeople] = useState([]);
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    firestore
      .collection("allUsers")
      .get()
      .then((res) => {
        setAllPeople(res.docs);
        var priceArray = [];
        res.docs.forEach((people) => {
          people.data()?.listOfItems.forEach((items) => {
            priceArray.push(items.price * items.antal);
          });
        });
        setAmount(priceArray.length);
        setTotal(priceArray.reduce((partialSum, a) => partialSum + a, 0));
      });
  }, []);
  /* useEffect(() => {
    axios.get("/indkob.json").then((res) => {
      setAllPeople(res.data);
      var priceArray = [];
      res.data.forEach((people) => {
        people.listOfItems.forEach((items) => {
          priceArray.push(items.price * items.antal);
        });
      });
      setAmount(priceArray.length);
      setTotal(priceArray.reduce((partialSum, a) => partialSum + a, 0));
    });
  }, []); */

  return (
    <div style={{ marginBottom: "15em" }}>
      <Link to={"/"}>Tilbage</Link>
      <h1>Indkøbslisten</h1>
      <div>
        <p>Total pris: {total} kr</p>
        <p>Total antal ting jeg skal købe: {amount}</p>
      </div>
      <div>
        {allPeople.map((people) => {
          const totalprice = people
            .data()
            .listOfItems.reduce(
              (partialSum, a) => partialSum + a.totalPrice,
              0
            );

          return (
            <div
              key={people.data().code}
              style={{ backgroundColor: "gray", marginBottom: "1em" }}
            >
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <p>{people.data().name}</p>
                <p>skal have {people.data().listOfItems.length} ting</p>
              </div>
              <div>
                <p>Liste</p>
                {people.data().listOfItems.map((item) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>
                          {item.antal} {item.name}
                        </p>
                        <p>{item.price} kr pr stk</p>
                      </div>
                      <hr />
                    </>
                  );
                })}

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Levering/bro gebyr</p>
                  <p>30 kr</p>
                </div>
                <hr />

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Total: </p>
                  <p>{totalprice + 30} kr</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
