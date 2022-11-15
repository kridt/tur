import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import ReglerOgVilkaar from "../components/ReglerOgVilkaar";
import { firestore } from "../firebase";

export default function Dashboard() {
  const codeId = useParams().id;
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    firestore
      .collection("allUsers")
      .get()
      .then((e) => {
        const findUser = e.docs.find((id) => id.id === codeId);
        setCurrentUser(findUser.data());
      });
  }, [codeId]);
  console.log(codeId);
  const User = () => {
    return (
      <>
        <Link to={"/"}>Log ud</Link>

        <h2>Dashboard</h2>
        <h3>{currentUser?.name}</h3>
        <nav style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link to={"profil"}>Profil</Link>
          <Link to={"indkobsliste"}>Indkøbsliste</Link>
        </nav>

        <Outlet />

        <br />
        <br />
        <h2>Regler og vilkår</h2>
        <ReglerOgVilkaar />
      </>
    );
  };
  return <User />;
}
