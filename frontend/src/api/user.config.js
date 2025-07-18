import api from "./config"

export const getUser = (pk) => api.get(`user/api/users/${pk}`)