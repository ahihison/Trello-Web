import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const loginWithGoogle = async (data) => {
  const response = await axios.post(`${API_ROOT}/v2/auth2/login`, data)
  return response.data
}

export const loginApi = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/auth/login`, data, {
    withCredentials: true
  })
  return response.data
}