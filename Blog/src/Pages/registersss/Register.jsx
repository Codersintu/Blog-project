
import { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Set loading to true

    try {
      const res = await axios.post("http://localhost:8101/api/auth/register", {
        username,
        email,
        password,
      });

      if (res.data) {
        // Clear input fields on successful registration
        setUsername("");
        setEmail("");
        setPassword("");
        window.location.replace("/login"); // Redirect on successful registration
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.log(err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
     
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          value={username} // Keep input value
          onChange={(e) => setUsername(e.target.value)} 
          className="registerInput" 
          type="text" 
          placeholder="Enter your username..." 
          required 
        />
        <label>Email</label>
        <input 
          value={email} // Keep input value
          onChange={(e) => setEmail(e.target.value)}  
          className="registerInput" 
          type="email" 
          placeholder="Enter your email..." 
          required 
        />
        <label>Password</label>
        <input 
          value={password} // Keep input value
          onChange={(e) => setPassword(e.target.value)}  
          className="registerInput" 
          type="password" 
          placeholder="Enter your password..." 
          required 
        />
        <button className="registerButton" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"} 
        </button>
      </form>
     
      <button className="registerLoginButton">
      <Link className="link" to='/login'>
        Login
        </Link>
        </button>
        {error && <div className="error">{error}</div>} {/* Display error message */}
      
    </div>
  );
}
