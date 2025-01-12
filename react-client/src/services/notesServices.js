import Api from "./api";

const notesServices = {
    index: async() => {
        try {
            const response = await Api.get('/notes', {
            headers: {'x-access-token': localStorage.getItem('token')}
            
            
    })
            console.log(response)
            return response
        } catch (error) {
            console.log("Erro interno", error)
            throw error.response.data.error
        }
    },

    newNote: async() => {
        try {
            const response = await Api.post('/notes', {"title": "Nova nota", "body": "..."}, {
                headers: {'x-access-token': localStorage.getItem('token')}

            })
            console.log(response)
            return response
        } catch (error) {
            throw error.response.data.error
            
        }
    },
    deleteNote: async(id) => {
        try {
            const response = await Api.delete(`/notes/${id}`, {
                headers: {'x-access-token': localStorage.getItem('token')}
                
            })
            console.log(response)
            return response
        } catch (error) {
            throw error.response.data.error
        }
    },

    updateNote: async(id, params) => {
        try {
            const response = await Api.put(`/notes/${id}`, params,{
                headers: {'x-access-token': localStorage.getItem('token')}
                
            })
            console.log(response)
            return response.data
        } catch (error) {
            throw error.response.data.error
        }
    },

    searchNote: async(query) => {
        try {
            const response = await Api.get(`/notes/search?query=${query}`,{
                headers: {'x-access-token': localStorage.getItem('token')}
                
            })
            console.log(response)
            return response
        } catch (error) {
            throw error.response.data.error
        }
    }
}

export default notesServices