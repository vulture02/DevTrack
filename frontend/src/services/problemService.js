import api from "./api";


export const problemService = {
    getAll: () => api.get('/problems'),
    create: (data) => api.post('/problems', data),
    update: (id, data) => api.put(`/problems/${id}`, data),
    delete: (id) => api.delete(`/problems/${id}`),
}
