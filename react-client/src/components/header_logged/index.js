import React, { Fragment, useState, useEffect } from "react";
import userServices from "../../services/users";
import logoImage from "../../assets/logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/header-logged.scss"

function HeaderLogged(props) {
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
      <nav className="navbar navbar-logged" role="navigation" aria-label="main navigation">
        {/* Navbar Brand */}
        <div className="navbar-brand">
          <a className="navbar-item" href="/notes">
            <img src={logoImage} alt="Logo" />
          </a>

          <button
            
            className={`navbar-burger ${isMenuActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isMenuActive ? "true" : "false"}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        {/* Navbar Menu */}
        <div id="navbarBasicExample" className={`navbar-menu ${isMenuActive ? "is-active" : ""}`}>
          {/* Navbar Start */}
          <div className="navbar-start notes-navbar">
            <button
              className="button is-white"
              onClick={() => props.setIsOpen(true)}
            >
              <FontAwesomeIcon icon={faList} />
            </button>
          </div>

          {/* Navbar End */}
          <div className="navbar-end">
            <div className="navbar-item in-notes has-dropdown is-hoverable">
              <a className="navbar-link" onClick={toggleDropdown}>
                <span className="userName">{userName}</span>
              </a>

              <div className={`navbar-dropdown logged ${isDropdownActive ? "is-active" : ""}`}>
                <Link to="/users/edit" className="navbar-item">
                  Editar
                </Link>
                <hr className="navbar-divider" />
                <a
                  className="navbar-item" onClick={logout}>
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

export default HeaderLogged;
