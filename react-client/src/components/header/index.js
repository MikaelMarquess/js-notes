import React, { useState } from "react";
import logojs from "../../assets/images/logo.png";
import "../../styles/header.scss";

const Header = () => {
  // Estado para controlar se o menu está ativo ou não
  const [isActive, setIsActive] = useState(false);

  // Função para alternar o estado
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar is-white" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logojs} alt="Logo" />
        </a>

        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive ? "true" : "false"}
          data-target="navbarBasicExample"
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className={`navbar-end home-header ${isActive ? "is-active" : ""}`}>
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" href="/register">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light" href="/login">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
