import Api from "./api"

const userServices = {
    register: async (params) => {
        try {
          const response = await Api.post("/users/register", params);
          return response.data;
        } catch (error) {
          if (error.response && error.response.data) {
            throw error.response.data.error; 
          }
          throw new Error("Ocorreu um erro inesperado."); 
        }
      },
      

    login: async(params) => {
       try {
        const response = await Api.post('/users/login', params);
        console.log("Login bem sucedido", response.data)
        localStorage.setItem('user', JSON.stringify(response.data.userLogin));
        localStorage.setItem('token', response.data.token)
        console.log(response)
       } catch (err) {
        console.log("erro no login", err.response)
        throw err.response.data.error;
       }
    },

    edit: async(id, params) => {
      try {
        const response = await Api.put(`users/edit/${id}`, params, {headers: {"x-access-token": localStorage.getItem('token')}})
        console.log(response.data)
      } catch (error) {
        console.log("ERRO CAUSADO: ", error)
        throw error.response.data.error
      }
    },

    delete: async(id) => {
      try {
        await Api.delete(`users/edit/${id}`, {headers: {"x-access-token": localStorage.getItem("token")}})
      } catch (error) {
        console.log(error)
      }
    },

    logout: () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
}
   

export default userServices