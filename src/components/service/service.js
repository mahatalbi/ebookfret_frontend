import axios from 'axios'
const baseUrl = 'http://localhost:8080/reservation'
const baseUurl = 'http://localhost:8080/maritimeCall'




  const deleteById = (id) => {
    return axios.delete(baseUrl+'/deleteReser/'+id)

  }

  const showById = (id) => {
    return axios.get(baseUrl+'/showDetails/'+id)
  }

  const getMaritim = () =>{
    return axios.get(baseUurl)
  }

  const updateEE = () => {
    return axios.updateEE
  }
export default { deleteById, showById,getMaritim }