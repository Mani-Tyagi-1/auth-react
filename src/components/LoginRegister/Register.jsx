import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseconfig";
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!role) {
      setError("Please select a role");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;
      await setDoc(doc(db,role ==='user' ? "users" : "admin", user.uid), {
        email,role,
      })
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

          <div>
            <label>
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              Signup as User
            </label>
            <label>
              <input
                type="radio"
                value="organization"
                checked={role === "organization"}
                onChange={() => setRole("organization")}
              />
              Signup as Organization
            </label>
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
