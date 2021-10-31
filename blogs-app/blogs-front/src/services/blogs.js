import axios from '../utils/apiClient'

// const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get('/blogs')
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post('/blogs', newObject, config)
  return response.data
}

const update = async (id, updateObject) => {
  const response = await axios.put(`/blogs/${id}`, updateObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`/blogs/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, remove }
