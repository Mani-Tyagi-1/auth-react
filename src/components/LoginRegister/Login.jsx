import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseconfig";
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // fetch user data from firebase
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const adminDoc = await getDoc(doc(db, "admin", user.uid));
      if (userDoc.exists()) { 
        setRole(userDoc.data().role);
        alert("Login Successful as user");
      }
      else if(adminDoc.exists()) {
        const orgDoc = await getDoc(doc(db, "admin", user.uid));
        if (orgDoc.exists()) { 
          setRole(orgDoc.data().role);
          alert("Login Successful as admin");
        }
      }
      else {
        alert("User not found... Please register first");
      }
      
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
              type="email"
              placeholder="email"
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
        {!error &&role && <p>Logged in as : {role}</p>}
      </div>
    </div>
  );
};

export default Login;
