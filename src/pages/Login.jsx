import { useRef } from "react";
import { axiosClient } from "../utils/axiosClient";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Login() {
  const loginRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      username: loginRef.current.value,
      password: passwordRef.current.value,
    });
    axiosClient
      .post("/auth/login", {
        username: loginRef.current.value,
        password: passwordRef.current.value,
      })
      .then((data) => {
        dispatch(login(data.data));
        window.localStorage.setItem("token", data.data.access_token);
        window.localStorage.setItem("refresh_token", data.data.refresh_token);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('./public/login1.jpg')" }}></div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                ref={loginRef}
                placeholder="Username"
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
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-blue-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-800 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
