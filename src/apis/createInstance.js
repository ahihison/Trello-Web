import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

import { API_ROOT } from '~/utils/constants'
// eslint-disable-next-line react-hooks/rules-of-hooks
axios.defaults.withCredentials = true
const refreshToken = async() => {
  try {
    const response = await axios.post(`${API_ROOT}/v1/auth/refresh`, {
      withCredentials: true
    })
    return response.data
  } catch (err) {
    console.log('🚀 ~ constrefreshTokenasync ~ err:', err)

  }
}

export const fetcher = (user, setUser) => {

  const newAxios = axios.create({})
  newAxios.interceptors.request.use(
    async(config) => {
      let date = new Date()
      const decodedToken = jwtDecode(user?.accessToken)
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken()
        const refreshUser = {
          ...user,
          accessToken:data.accessToken
        }
        setUser(refreshUser)
        config.headers['token'] = 'Bearer ' + data.accessToken
      }
      else {
        // If the token is not expired, still attach it to the header
        config.headers['token'] = 'Bearer ' + user.accessToken
      }
      return config
    },
    (err) => Promise.reject(err)
  )
  return newAxios
}


