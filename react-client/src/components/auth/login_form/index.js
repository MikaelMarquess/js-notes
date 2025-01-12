import React, {Fragment, useState} from "react";
import {useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import userServices from "../../../services/users";

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [viewPassword, setViewPassword] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await userServices.login({email: email, password: password})
            navigate("/notes")
        } catch (err) {
            setError(err)
            
        }
    }

    const passwordViewHandle = () => {
        setViewPassword(!viewPassword)
    }


    return(
        <Fragment>
            <section className="columns">
                <section className="registering column is-12">
                <form onSubmit={handleSubmit}>
                    <label className="has-text-black" htmlFor="email">Email: </label>
                    <section>
                    <input type="Email" id="email" required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    </section>

                    <label className="has-text-black" htmlFor="password">Senha: </label>
                    <section>
                    <input type={`${viewPassword ? "text" : "password"}`} id="password" required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    </section>
                    <button className="viewPassword" type="button" onClick={passwordViewHandle}>
                        <FontAwesomeIcon icon={viewPassword ? faEye : faEyeSlash}/>
                    </button>

                    <section>
                        <button type="submit" className="login button">Entrar</button>
                    </section>
                    </form>
                    {error && (
                        <p className="error-message has-text-danger">
                            {error}
                        </p>
                    )}
                </section>
            </section>
        </Fragment>
    )
}

export default LoginForm