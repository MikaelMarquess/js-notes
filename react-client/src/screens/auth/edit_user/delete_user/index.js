import React, {Fragment} from "react";
import userServices from "../../../../services/users";
import { useNavigate } from "react-router-dom";


const DeleteButton = () => {
    const navigate = useNavigate()


    const deleteAccount = async() => {
        const idUser = await JSON.parse(localStorage.getItem("user"))
        if(window.confirm("Deseja relmente excluir sua conta?")){
            await userServices.delete(idUser._id)
            await userServices.logout()
            navigate("/")
        }
    }
    return(
    <Fragment>
        <section className="delete-button-container">
        <button style={{border: "none"}} type="button" className="button has-background-danger" onClick={deleteAccount}>
            excluir
        </button>
        </section>
    </Fragment>
    )
    
}

export default DeleteButton