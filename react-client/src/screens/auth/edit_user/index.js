import React, {Fragment} from "react";
import UserHeader from "../../../components/user/user_header";
import logo from "../../../assets/logo.png"
import EditForm from "../../../components/user/user_edit";


const EditUser = () => {
    return(
    <Fragment>
        <UserHeader/>
        <section className="register">
                <section className="container">
                    <section className="columns is-centered">
                        <section className="column is-4">
                            <section className="card has-background-white">
                                <section className="card-content">
                                    <section className="card-image">
                                        <img className="logo-register" src={logo} alt="Imagem de apresentação do projeto"/>
                                    </section>

                                    <section className="card-content" >
                                        <p className="subtitle">Editar</p>
                                    </section>                                    
                                    <EditForm/>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
    </Fragment>
    )
}


export default EditUser