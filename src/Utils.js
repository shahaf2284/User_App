import axios from 'axios'


const getAll = (url) => axios.get(url)

const getById = (url,id) => axios.get(`${url}/?userId=${id}`)


export default {getAll,getById}