import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = () => {
    axios
      .post("http://localhost:4000/register", { username, password })
      .then(() => {
        console.log("user is registered");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        navigate("/register");
      });
  };
  return (
    <div>
      <h2> This is Register Page</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <br />
      <button type="submit" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
