import React from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../App";

export const Profile = () => {
  const navigate = useNavigate();
  const user = React.useContext(AuthContext);

  console.log(user);

  const handleLogout = () => {
    user.setAuth({});
    navigate("/login");
  };
  return (
    <div className="home">
      <h1>My Profile</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};
