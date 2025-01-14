import React, {Fragment} from "react"
import Header from "../../components/header/index"
import jsHome from "../../assets/images/presentation.png"
import "../../styles/home.scss"

const HomeScreen = () => {
    return(
        <Fragment>
            <Header/>
            <section className="home">
            <section className="content has-text-centered">
                <div className="container">
                <section className="columns">
                    <section className="column is-5">
                        <h1 className="title is-2 has-text-white has-text-left">Crie notas customizadas de forma prática</h1>
                        <p className="subtitle is-6 has-text-light has-text-left">Inspirado no EverNote, um software que armazena suas notas personalizadas de maneira online.
                        </p>
                        <a href="/register" className="button is-outlined is-white is-large">Registre-se grátis agora </a>
                    </section>

                    <section className="column is-8">
                        <img src={jsHome} alt=""/>
                    </section>
                </section>
                </div>
            </section>
            </section>
        </Fragment>
    )
}

export default HomeScreen