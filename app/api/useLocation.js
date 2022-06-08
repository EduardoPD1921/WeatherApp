import axios from 'axios'

export default function useLocation() {
  const api = axios.create({
    baseURL: 'https://api.bigdatacloud.net/data/',
    params: {
      localityLanguage: 'pt-br'
    }
  })

  return api
}