import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseconfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="Login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div>
            <input
              type="text"
              placeholder="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              qualue={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>

          <div>
            <p>
              Don't have an account?
              <a href="/">Register</a>
            </p>
          </div>
        </form>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
