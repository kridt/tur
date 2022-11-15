import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ReglerOgVilkaar from "../components/ReglerOgVilkaar";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Dashboard() {
  // const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  useEffect(() => {
    if (currentUser.name === undefined) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  console.log(currentUser);
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
