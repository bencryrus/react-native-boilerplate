import axios from 'axios'

const customApi = axios.create({
    baseURL: 'http://192.168.1.251:3000/v1'
})
