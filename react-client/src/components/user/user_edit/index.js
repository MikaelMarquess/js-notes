import React, {Fragment, useState} from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../../../services/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "../../../screens/auth/edit_user/delete_user";
import "../../../styles/forms.scss"
const EditForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassowrd, setConfirmPassword] = useState("")
    const [viewPassword, setViewPassword] = useState(false)
    const [status, setStatus] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleEdit = async(e) => {
        e.preventDefault()
        setError("")
        setStatus("")
        const user = await JSON.parse(localStorage.getItem('user'))
        try {

            const updateUser = {name, email, password}

            const filteredData = Object.fromEntries(
                Object.entries(updateUser).filter(([_, value]) => value && value.trim())
            )

            if(Object.keys(filteredData).length === 0){
                throw new Error("empty-data")
            }

            if(filteredData.password || confirmPassowrd){

            if(filteredData.password !== confirmPassowrd){

                throw new Error("incorrect-password");

            }else if(filteredData.password.length < 6){

                throw new Error("small-password");

            }
        }
            
            

            await userServices.edit(user._id, filteredData)

            const shouldLogout = Boolean(filteredData.email || filteredData.password)

            if(shouldLogout){
            await userServices.logout()
            alert("Faça login novamente.")
            navigate("/")
        }else{
            alert("Nome atualizado!")
        }
        } catch (err) {
            if(err.message === "empty-data"){
                setError("Nenhum dado fornecido")
            }else if(err.message === "incorrect-password"){
                setStatus("Senhas incorretas")
            }else if(err.message === "small-password"){
                setStatus("Senha com o mínimo 6 caracteres")
            }else{
                console.log(err.message, err)
                setError("Erro desconhecido, tente novamente.")
            }
            
        }
    }

    const passwordHandle = () => {
        setViewPassword(!viewPassword)
    }

    return(
        <Fragment>
            <section className="columns">
                <section className="edit column is-12 ">
                <form onSubmit={handleEdit}>
                    <label className="has-text-black" htmlFor="email">Nome: </label>
                    <section>
                    <input type="Name" id="name" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    </section>
                    <label className="has-text-black" htmlFor="email">Email: </label>
                    <section>
                    <input type="Email" id="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    </section>

                    <label className="has-text-black" htmlFor="password">Senha: </label>
                    <section>
                    <input type={viewPassword ? "password" : "text"} id="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    </section>

                    <label className="has-text-black" htmlFor="password-confirm">Confirmar senha: </label>
                    <section>
                    <input type={viewPassword ? "password" : "text"} id="password-confirm" 
                    value={confirmPassowrd}
                    onChange={e => setConfirmPassword(e.target.value)}
                    />
                    </section>
                    <button type="button" className="viewPassword" onClick={passwordHandle}>
                        <FontAwesomeIcon icon={viewPassword ? faEye : faEyeSlash}/>
                    </button>
                    <section>
                        <button type="submit" className="login button">Salvar</button>
                    </section>
                    <section>
                        <DeleteButton/>
                    </section>
                    </form>
                    {status && (
                        <p className="error-message has-text-danger">
                            {status}
                        </p>
                    )}
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

export default EditForm