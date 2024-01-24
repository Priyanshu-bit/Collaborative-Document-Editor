import React, { useContext, useState } from "react";
import axios from "axios";
import { authContext } from "../App";
import { useNavigate,Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();


  const handleSubmit = async () => {
    try {
      const data = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
      setUser(data.data.user);
      setIsLoggedIn(true);
      navigate('/')
    } catch (error) {
      console.error(error);
      alert("login failed");
    }
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button onClick={handleSubmit}>Login</button>
      </div>
      <h4>
        Don't have a accouunt? <Link to="/signup">Sign Up</Link>
      </h4>
    </div>
  );
};

export default Login;
