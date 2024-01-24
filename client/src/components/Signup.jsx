import React, { useContext, useState } from "react";
import axios from "axios";
import { authContext } from "../App";
import { useNavigate , Link} from "react-router-dom";
import './SignUp.css'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLoggedIn } = useContext(authContext);
const navigate = useNavigate();
  const handleSubmit = async () => {
    
    try {
      const data = await axios.post(
        "http://localhost:5000/api/v1/auth/signUp",
        { username, email, password },
      );
      setUser(data.data.user);
      setIsLoggedIn(true);
      navigate('/')
      
    } catch (error) {
      console.error(error);
      alert("signup failed");
    }
  };
  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <div>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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

        <button onClick={handleSubmit}>SignUp</button>
        <br></br>
        <h3>
          Already have a account? <Link to="/login">Login</Link>{" "}
        </h3>
      </div>
    </div>
  );
};

export default Signup;
