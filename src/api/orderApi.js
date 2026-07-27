import axiosInstance from './axiosInstance';

export const placeOrder = (data) => {
  return axiosInstance.post('/orders', data);
};

export const getTableBill = (tableNumber) => {
  return axiosInstance.get(`/orders/table/${tableNumber}/bill`);
};