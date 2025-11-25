//- isaiah little --//

import { useState } from "react"; 

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
        <div>
            <h2>Login</h2>

            {error && <p style={{ color: "red"}}>{error}</p>}

            <form onSubmit={handleSubmit}>
             <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
             />

             <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            
             />
             <button type="submit">Login</button>
            </form>
        </div>
    );
}
