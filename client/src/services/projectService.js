import api from './api';

export async function getProjects() {
  const { data } = await api.get('/projects');
  return data.data; // Server usually returns { success: true, data: [...] }
}

export async function getProjectById(id) {
  const { data } = await api.get(`/projects/${id}`);
  return data.data;
}

export async function createProject(payload) {
  const { data } = await api.post('/projects', payload);
  return data.data;
}

export async function updateProject(id, payload) {
  const { data } = await api.put(`/projects/${id}`, payload);
  return data.data;
}

export async function deleteProject(id) {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
}
