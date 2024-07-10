import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import "../Styles/Login.css";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      // console.log(res.data)
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <>
      {/* <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog Market</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div> */}
      <div className="login-page">
        <Navbar />
        <div className="login w-full flex justify-center items-center h-[85vh] ">
          <div className="wrapper">
            <div className="form-box login">
              <h2>Log in</h2>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <label>Password</label>
              </div>
              <button onClick={handleLogin} className="btn-login">
                Log in
              </button>
              {error && (
                <h3 className="text-red-500 text-sm ">Something went wrong</h3>
              )}
              <div className="login-register">
                <p>Don't have an account? </p>
                <a className="register-link">
                  <Link to="/register">Register</Link>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
