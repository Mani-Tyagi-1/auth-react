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
    <div className="Login min-h-screen  flex flex-col justify-center items-center ">
      <div className=" w-[20%] flex flex-row items-center justify-center border-2 border-gray-600 p-5 rounded ">
        <form onSubmit={handleLogin}>
          <h1 className="text-3xl p-2 font-bold mb-2 text-center">Login</h1>
          <div>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 border-gray-600 p-2 rounded none mb-2  w-[15rem] hover:scale-105"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              qualue={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-2 border-gray-600 p-2 rounded none  w-[15rem]  hover:scale-105"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-1 w-[15rem]  mt-2 mb-2 rounded hover:scale-105"
          >
            Login
          </button>

          <div>
            <p>
              Don't have an account?
              <a href="/" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </div>
        </form>

        {error && <p>{error}</p>}
      </div>
      {!error && role && <p>Logged in as : {role}</p>}
    </div>
  );
};

export default Login;
