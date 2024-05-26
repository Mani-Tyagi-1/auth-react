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
    <div className=" min-h-screen  flex justify-center items-center">
      <div className="register w-[20%] flex items-center justify-center border-2 border-gray-600 p-5 rounded">
        <form onSubmit={handleSignup}>
          <h1 className="text-3xl p-2 font-bold mb-2 text-center">
            Registration
          </h1>
          <div>
            <input
              type="email"
              value={email}
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-600 p-2 rounded none mb-2 w-[15rem]  hover:scale-105"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-600 p-2 rounded none mb-2 w-[15rem]  hover:scale-105"
            />
          </div>

          <div>
            <label className="mr-4 ">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="w-[1rem] mr-1 "
              />
              User
            </label>

            <label>
              <input
                type="radio"
                value="organization"
                checked={role === "organization"}
                onChange={() => setRole("organization")}
                className="w-[1rem] mr-1 "
              />
              Admin
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-1  w-[15rem]  mt-2 mb-2 rounded hover:scale-105"
          >
            Register
          </button>

          <div>
            <p>
              Already have an account?
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
