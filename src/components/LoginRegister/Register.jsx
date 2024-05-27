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
      <div className="register w-[21rem] flex items-center justify-center border-2 border-gray-400 p-5 rounded  bg-gray-500 bg-opacity-60 shadow-sm hover:shadow-white">
        <form onSubmit={handleSignup}>
          <h1 className="text-3xl p-2 text-white font-bold mb-2 text-center">
            Registration
          </h1>
          <div>
            <input
              className="border-2 border-white text-white p-2 rounded none mb-2 w-[15rem] placeholder:text-white placeholder:font-bold  hover:scale-105 bg-transparent"
              type="email"
              value={email}
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-white text-white p-2 rounded none mb-2 w-[15rem] placeholder:text-white placeholder:font-bold  hover:scale-105 bg-transparent"
            />
          </div>

          <div>
            <label className="mr-4 text-white font-bold">
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="w-[1rem] mr-1 "
              />
              User
            </label>

            <label className="text-white font-bold">
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
            className="bg-blue-500 text-white p-1 font-bold w-[15rem] h-[2.5rem] mt-2 mb-2 rounded  hover:bg-white hover:text-blue-500"
          >
            Register
          </button>

          <div>
            <p className="text-white">
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
