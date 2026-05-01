import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(
        "https://taskmanager-production-ad18.up.railway.app/api/auth/register",
        { name, email, password }
      );

      alert("Signup Successful");
      nav("/"); // go to login

    } catch (err) {
      alert("Signup Failed");
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}