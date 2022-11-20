import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import ReglerOgVilkaar from "../components/ReglerOgVilkaar";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Dashboard() {
  // const [currentUser, setCurrentUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const codeId = useParams().id;

  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  useEffect(() => {
    if (currentUser.name === undefined) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (codeId === "2202") {
      setAdmin(true);
    }
  }, [codeId]);

  console.log(admin);

  /* useEffect(() => {
    firestore
      .collection("allUsers")
      .get()
      .then((e) => {
        const findUser = e.docs.find((id) => id.id === codeId);
        setCurrentUser(findUser.data());
      });
  }, [codeId]); */

  const User = () => {
    return (
      <>
        <Link to={"/"}>Log ud</Link>
        <br />
        <br />
        {admin ? <Link to={`adminPage/${codeId}`}>admin site</Link> : <></>}

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
