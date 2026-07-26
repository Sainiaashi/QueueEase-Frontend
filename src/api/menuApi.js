import axiosInstance from './axiosInstance';

export const getAvailableMenu = () => {
  return axiosInstance.get('/menu/available');
};

export const getAllMenu = () => {
  return axiosInstance.get('/menu');
};