import axiosInstance from './axiosInstance';

export const joinQueue = (data) => {
  return axiosInstance.post('/queue/join', data);
};

export const getQueueStatus = (id) => {
  return axiosInstance.get(`/queue/${id}/status`);
};