import axios from 'axios'

const apiClient = axios.create({
  // Relative URL — requests go through the Vite dev proxy to Laravel.
  // In production, set VITE_API_URL to the absolute API base (e.g. https://api.example.com/api/v1).
  baseURL: import.meta.env.VITE_API_URL ?? '/api/v1',
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data)
    }
    return Promise.reject(error)
  },
)

export default apiClient
