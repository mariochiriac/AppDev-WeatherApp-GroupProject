import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";

const API_BASE_URL = "http://localhost:3010";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    //-- Validation for Email Address--// 
    if (!email.includes("@")) {
        setError("Please enter a valid email.");
        return;
    }
    //- Ruels for the password 
    const passwordRules = 
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!$&#])[A-Za-z\d!$&#]{8,}$/;


    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!passwordRules.test(password)) {
        setError(
            "Password must be 8+ chars, include a capital letter, a number, and a special character (! $ & #)."
        );
        return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/seed-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName: "Test", lastName:"User" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(res.error || "Signup failed. Please try again.");
        return;
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      localStorage.setItem("userEmail", data.user?.email || email);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/");
      }, 2000);      
    }
  }

  return (
     <div className="signup-page">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="signup-error">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>

          <p className="login-small">
            Already have an account? <Link to="/">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;