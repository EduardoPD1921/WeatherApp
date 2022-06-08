import axios from 'axios'
import Config from 'react-native-config'

export default function useWeather() {
  const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    params: {
      appid: Config.API_KEY,
      units: 'metric'
    }
  })

  return api
}