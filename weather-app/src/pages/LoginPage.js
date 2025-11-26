//- isaiah little --//

import { useState } from "react"; 
import styles from "./LoginPage.css";
import logo from "../logo192.png";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
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
        window.location.href = "/weather";
        
    };
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <img src={logo}></img>
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
            </form>
        </div>
    );
}
