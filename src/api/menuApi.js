import axiosInstance from './axiosInstance';

export const getAvailableMenu = () => {
  return axiosInstance.get('/menu/available');
};

export const getAllMenu = () => {
  return axiosInstance.get('/menu');
};

export const createMenuItem = (data) => {
  return axiosInstance.post('/menu', data);
};

export const toggleAvailability = (id) => {
  return axiosInstance.patch(`/menu/${id}/toggle-availability`);
};

export const deleteMenuItem = (id) => {
  return axiosInstance.delete(`/menu/${id}`);
};