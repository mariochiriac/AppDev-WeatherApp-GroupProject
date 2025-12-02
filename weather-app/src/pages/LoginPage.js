//- isaiah little --//

import { useState } from "react"; 
import "./LoginPage.css";
import logo from "../logo192.png";

const API_BASE_URL = "http://localhost:3010";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => { 
        e.preventDefault();

        //-- Validation for Email Address--// 
        if (!email.includes("@")) {
            setError("Please enter a valid email.");
            return;
        }
        //- Ruels for the password 
        const passwordRules = 
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!$&#])[A-Za-z\d!$&#]{8,}$/;

        if (!passwordRules.test(password)) {
            setError(
                "Password must be 8+ chars, include a capital letter, a number, and a special character (! $ & #)."
            );
            return;
        }
        
        /*Temporary navigation before the back end is ready. 
        Delete this chunk when backend is complete */
        try{
            const response = await fetch(`${API_BASE_URL}/api/auth`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password}),
            });

            const data = await response.json();

            if(!response.ok) {
                setError(data.error || "Invalid email or password");
                return;
            }

            if(data.token) {
                localStorage.setItem("authToken", data.token);
            } else {
                localStorage.setItem("authToken", "dummy-token");
            }

            localStorage.setItem("userEmail", data.user?.email || email);
            window.location.href = "/dashboard";

        } catch (err) {
            console.error(err);
            setError("Network error. Please try again.");
        } 
    };
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <img src={logo} alt="Logo"></img>
                <h2>Welcome to WeatherApp</h2>
                <p>Sign in to view current weather conditions</p>
                    
                {error && <p style={{ color: "red"}}>{error}</p>}
                
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    
                    />
                </div>
                <button type="submit">Login</button>
                <p className="login-small">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>
            </form>
        </div>
    );
}
