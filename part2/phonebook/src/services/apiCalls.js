import axios from 'axios'


const baseUrl = "http://localhost:3001/persons"


function create(data) {
    const request = axios.post(baseUrl, data)
    
    return request.then(
        response => {
            return response.data
        }
    )
}


function getAll() {
    const request = axios.get(baseUrl)

    return request.then(
        response => response.data
    )
}


function deleteUser(id) {
    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then(
        request => request.data
    )
}


function update(id, data) {
    const request = axios.put(`${baseUrl}/${id}`, data)

    return request.then(
        response => response.data
    )
}

export default {getAll, create, update, deleteUser}
