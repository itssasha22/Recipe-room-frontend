import api from './api';

const paydService = {
  initializePayment: async (amount, currency, description) => {
    const response = await api.post('/payments/initiate', {
      amount,
      currency,
      description
    });
    return response.data;
  },

  verifyPayment: async (transactionId) => {
    const response = await api.get(`/payments/verify/${transactionId}`);
    return response.data;
  },

  getPaymentHistory: async () => {
    const response = await api.get('/payments/history');
    return response.data;
  }
};

export default paydService;
