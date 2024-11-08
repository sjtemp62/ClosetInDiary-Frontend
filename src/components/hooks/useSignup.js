import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export function useSignup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/signup`, {
        username,
        name,
        email,
        password,
      });
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return {
    username,
    setUsername,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
  };
}