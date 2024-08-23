import { useRef } from "react";
import { axiosClient } from "../utils/axiosClient";
import { register } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'; 

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosClient
      .post("/auth/register", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((data) => {
        dispatch(register(data.data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('./register.jpg')" }}></div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                ref={usernameRef}
                placeholder="Username"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                ref={emailRef}
                placeholder="Email"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                ref={passwordRef}
                placeholder="Password"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-blue-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-800 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
