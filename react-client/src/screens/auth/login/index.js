import React, {Fragment} from "react";
import Header from "../../../components/header";
import logo from "../../../assets/images/logo.png"
import LoginForm from "../../../components/auth/login_form";
import "../../../styles/forms.scss"

const LoginScreen = () => {
    return(
        <Fragment>
            <Header/>
            <section className="register">
                <section className="container">
                    <section className="columns is-centered">
                        <section className="column is-4">
                            <section className="card has-background-white">
                                <section className="card-content">
                                    <section className="card-image">
                                        <img className="logo-register" src={logo} alt=""/>
                                    </section>

                                    <section className="card-content" >
                                        <p className="subtitle">Editar</p>
                                    </section>                                    
                                    <LoginForm/>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </Fragment>
    )
}
export default LoginScreen