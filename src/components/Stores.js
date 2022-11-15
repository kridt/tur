import React from "react";

export default function Stores() {
  return (
    <div>
      <div>
        <p style={{ textAlign: "center" }}>
          Her er de butikker, vi skal i kruså butikkerne
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "2em",
        }}
      >
        <a
          rel={"noreferrer"}
          target={"_blank"}
          style={{
            color: "white",
          }}
          href="https://www.calle.dk/?locId=606"
        >
          Calle
        </a>
        <a
          rel={"noreferrer"}
          target={"_blank"}
          style={{
            color: "white",
            textDecoration: "none",
          }}
          href="https://www.fleggaard.dk/?locId=730s&gclid=CjwKCAiA68ebBhB-EiwALVC-NogUoLWEreJ2rf4cZq-XvjjWhebOJqyLsrPFx6z_zpqL1471NA0WshoCtnoQAvD_BwE&uid=0.5379908112789136"
        >
          Fleggard
        </a>
      </div>
    </div>
  );
}
