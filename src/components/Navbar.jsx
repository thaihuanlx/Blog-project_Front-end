import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  // console.log(prompt)

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="bg-red-400 flex items-center justify-between px-6 md:px-[200px] py-4 ">
      <h1 className="logo">
        <Link to="/">XBlogger</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0 relative">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none pl-3 px-3 h-10"
            placeholder="Search a post"
            type="text"
          />
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer absolute right-3"
          >
            <BsSearch />
          </p>
        </div>
      )}
      <div className="navigation">
        {user ? (
          <p className="btncreate">
            <Link to="/write">Create Blog</Link>
          </p>
        ) : (
          <button className="btnlogin">
            <Link to="/login">Login</Link>
          </button>
        )}
        {user ? (
          <div onClick={showMenu}>
            <a className="cursor-pointer relative">
              <FaUser />
            </a>
            {menu && <Menu />}
          </div>
        ) : (
          <p className="btnregister">
            <Link to="/register">Register</Link>
          </p>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaUser />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
