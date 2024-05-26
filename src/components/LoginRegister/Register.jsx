import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseconfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth,email, password);
      alert("Registration Successful");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="register">
        <form onSubmit={handleSignup}>
          <h1>Registration</h1>
          <div>
            <input
              type="email"
              value={email}
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>

          <div>
            <p>
              Already have an account?
              <a href="/login">Login</a>
            </p>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
