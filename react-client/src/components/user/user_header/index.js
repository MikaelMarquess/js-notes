import React, { Fragment, useState, useEffect } from "react";
import userServices from "../../../services/users";
import logoImage from "../../../assets/images/logo.png";
import { Navigate, Link, useNavigate } from "react-router-dom";
import "../../../styles/user-header.scss"

function UserHeader() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
    }
  }, []);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  const toggleDropdown = () => setIsDropdownActive(!isDropdownActive);

  const logout = async () => {
    await userServices.logout();
    navigate("/")
  };

  

  return (
    <Fragment>
      <nav className="navbar is-white navbar-user" role="navigation" aria-label="main navigation">
        {/* Navbar Brand */}
        <div className="navbar-brand">
          <a className="navbar-item navbar-return" href="/notes">
            <img src={logoImage} alt="Logo" />
          </a>

          <a
            role="button"
            className={`navbar-burger ${isMenuActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isMenuActive ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        {/* Navbar Menu */}
        <div id="navbarBasicExample" className={`navbar-menu ${isMenuActive ? "is-active" : ""}`}>
          {/* Navbar Start */}

          {/* Navbar End */}
          <div className={`navbar-end ${isDropdownActive ? "is-active" : ""}`}>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" onClick={toggleDropdown}>
                <span className="userName">{userName}</span>
              </a>

              <div className={`navbar-dropdown logged${isDropdownActive ? "is-active" : ""}`}>
                <Link to="/users/edit" className="navbar-item">
                  Editar
                </Link>
                <hr className="navbar-divider" />
                <a className="navbar-item" onClick={logout}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default UserHeader;
