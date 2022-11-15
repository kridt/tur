import React from "react";

export default function ListeComponents({ name, price, antal }) {
  const tPrice = price * antal;

  return (
    <div
      style={{
        backgroundColor: "darkgrey",
        padding: ".5em .5em",
        margin: "1em .5em",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>{antal + " " + name}</div>
      <div>{tPrice} kr</div>
    </div>
  );
}
