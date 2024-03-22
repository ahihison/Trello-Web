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

export const updateBoardDetailApi = async (boardId, updateData, user, setUser) => {
  let axiosJWT = fetcher(user, setUser)
  const response = await axiosJWT.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}
export const moveCardToDiffirentcolumnApi = async (updateData, user, setUser) => {
  let axiosJWT = fetcher(user, setUser)
  const response = await axiosJWT.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}
// COLUMN
export const createNewColumnAPI = async (newColumnData, user, setUser) => {
  let axiosJWT = fetcher(user, setUser)
  const response = await axiosJWT.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailApi = async (columnId, updateData, user, setUser) => {
  let axiosJWT = fetcher(user, setUser)
  const response = await axiosJWT.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}
export const deleteColumnDetailApi = async (columnId, user, setUser) => {
  let axiosJWT = fetcher(user, setUser)
  const response = await axiosJWT.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

// CARD
export const createNewCardAPI = async (newCardData, user, setUser) =>
{
  let axiosJWT = fetcher(user, setUser)
  const response = await axiosJWT.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}