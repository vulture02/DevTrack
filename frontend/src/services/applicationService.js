import api from './api'
export const applicationService = {
  getAll: () => api.get('/applications'),
  create: (data) => api.post('/applications', data),
  update: (id, data) => api.put(`/applications/${id}`, data),
  delete: (id) => api.delete(`/applications/${id}`),
}