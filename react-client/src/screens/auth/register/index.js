import React, {Fragment} from "react";
import Header from "../../../components/header";
import logo from "../../../assets/logo.png"
import RegisterForm from "../../../components/auth/register_form/index"
import "../../../styles/forms.scss"

const RegisterScreen = () => {
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
                                        <p className="subtitle">Suas notas na nuvem</p>
                                    </section>                                    
                                    <RegisterForm/>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </Fragment>
    )
}
export default RegisterScreen