import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, []);

  return (
    <div>
      <h2> This is Profile Page</h2>
    </div>
  );
};

export default Profile;
