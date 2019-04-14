import axios from 'axios'

const api = axios.create({
    baseURL: 'https://lricardo-omni-backend.herokuapp.com'
    // baseURL: 'https://localhost:4000'
})

export default api