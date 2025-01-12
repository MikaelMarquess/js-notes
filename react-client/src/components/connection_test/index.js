import React, { useEffect, useState } from "react";
import Api from "../../services/api"; 

const TestConnection = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        Api.get("/api/message")
            .then((response) => {
                setMessage(response.data.message); // Armazena a mensagem no estado
            })
            .catch((error) => {
                console.error("Erro ao conectar ao back-end:", error);
            });
    }, []);

    return (
        <div>
            <h1>Teste de Conexão</h1>
            {message ? <p>{message}</p> : <p>Carregando...</p>}
        </div>
    );
};

export default TestConnection;
