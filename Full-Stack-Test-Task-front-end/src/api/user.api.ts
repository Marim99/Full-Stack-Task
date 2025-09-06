import api from './api';

export const me = () => api.get('/api/users/me');
