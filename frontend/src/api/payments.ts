import apiClient from "./axiosInstance";

export const fetchPayments = async () => {
    const response = await apiClient.get(`/payment/payments`);
    console.log('response.data:',response.data)
    return response.data;
};

