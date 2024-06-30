import axios from 'axios';
import { Transaction } from '../types/TransactionType';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.log(`Attempting login for username: ${username}`);
    throw new Error('Login failed');
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/register', { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const fetchTransactions = async (token: string, page?: number, perPage?: number) => {
  try {
    const response = await axiosInstance.get('/transactions', {
      headers: { 'authorization': token },
      params: {
        page,
        perPage
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch transactions');
  }
};

export const createTransaction = async (transaction: Transaction[], token: string) => {
  try {
    const response = await axiosInstance.post('/transactions', transaction, {
      headers: { 'authorization': token },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create transaction');
  }
};

export const updateTransaction = async (id: number, status: string, token: string) => {
  try {
    const response = await axiosInstance.put(`/transactions/${id}`, { status }, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update transaction');
  }
};

export const deleteTransaction = async (id: number, token: string) => {
  try {
    const response = await axiosInstance.delete(`/transactions/${id}`, {
      headers: { 'authorization': token },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete transaction');
  }
};

export const importTransactions = async (transactions: Transaction[], token: string) => {
  try {
    const response = await axiosInstance.post(`/transactions/import`, transactions, {
      headers: { 'authorization': token },
    });
    return response.data;
  } catch (error) {
    console.error('Error importing transactions:', error);
    throw new Error('Failed to import transactions');
  }
};

export const exportTransactions = async (token: string, filters?: string[]) => {
  try {
    const response = await axiosInstance.get(`/transactions/export`, {
      headers: { 'authorization': token },
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to export transactions');
  }
};
