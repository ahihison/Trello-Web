import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
import { fetcher } from './createInstance'
// BOARD
export const fetchBoardDetailAPI = async (boardId, user, setUser) => {
  let axiosJWT = fetcher(user, setUser)
  const response = await axiosJWT.get(`${API_ROOT}/v1/boards/${boardId}`, {
    withCredentials: true
  })
  return response.data
}

export const updateBoardDetailApi = async (boardId, updateData) => {

  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}
export const moveCardToDiffirentcolumnApi = async (updateData) => {

  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}
// COLUMN
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailApi = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}
export const deleteColumnDetailApi = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

// CARD
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}