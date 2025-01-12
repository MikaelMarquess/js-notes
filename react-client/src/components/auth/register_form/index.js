import React, {Fragment, useState} from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../../../services/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faTrash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [viewPassword, setViewPassword] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            if(password != confirmPassword){
                throw new Error("incorrect-password");
            }

            if(password.length < 6){
                throw new Error("small-password");
                
            }

            await userServices.register({name: name, email: email, password: password})
            navigate("/login")
        } catch (error) {
            if(error.message == "incorrect-password"){
                setError("Senha incorreta")
            }else if(error.message == "small-password"){
                setError("Senha com mínimo 6 digitos")
            }else{
            console.error("erro ao registrar")
            setError("Erro interno ao registrar, tente novamente.")
            }
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
                    <label className="has-text-black" htmlFor="name">Nome: </label>
                    <section>
                    <input className="name" id="name" required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    </section>

                    <label className="has-text-black" htmlFor="email">Email: </label>
                    <section>
                    <input type="Email" id="email" required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    </section>

                    <label className="has-text-black" htmlFor="password">Senha: </label>
                    <section>
                    <input type={viewPassword ? "password" : "text"} id="password" required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    </section>

                    <label className="has-text-black" htmlFor="confirmPassword">Confirmar senha: </label>
                    <section>
                    <input type={viewPassword ? "password" : "text"} id="confirmPassword" required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    />
                    </section>
                    <button className="viewPassword" type="button" onClick={passwordViewHandle}>
                        <FontAwesomeIcon icon={viewPassword ? faEye : faEyeSlash}/>
                    </button>
                    <section>
                        <button type="submit" className="register button">Registrar</button>
                        <button type="button" className="login button" onClick={() => navigate("/login")}>Entrar</button>
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

export default RegisterForm