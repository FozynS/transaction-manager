import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { Transaction } from '../types/TransactionType';
import Filters from '../types/FiltersType';
import TransactionItem from '../types/TransactionItem';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useLogin = () => {
  return useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const response = await axiosInstance.post('/login', { username, password });
      return response.data;
    },
    {
      onError: (error: Error) => {
        console.error(`Login attempt failed:`, error);
        throw new Error('Login failed');
      },
    }
  );
};

export const useRegister = () => {
  return useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const response = await axiosInstance.post('/register', { username, password });
      return response.data;
    },
    {
      onError: () => {
        throw new Error('Registration failed');
      },
    }
  );
};

export const useFetchTransactions = (
  token: string,
  page?: number,
  perPage?: number,
  filters?: Filters
) => {
  return useQuery(['transactions', token, page, perPage, filters], async () => {
    const response = await axiosInstance.get('/transactions', {
      headers: { authorization: token },
      params: {
        page,
        perPage,
        status: filters?.status,
        type: filters?.type,
        searchQuery: filters?.searchQuery,
      },
    });
    return response.data.data;
  }, {
    enabled: !!token,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 2,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
    staleTime: 300000,
  });
};


export const useUpdateTransaction = () => {
  return useMutation(
    async ({ id, updatedFields, token }: { id: number; updatedFields: Partial<TransactionItem>; token: string }) => {
      const response = await axiosInstance.put(`/transactions/${id}`, { updatedFields }, {
        headers: { authorization: token },
      });
      return response.data;
    },
    {
      onError: () => {
        throw new Error('Failed to update transaction');
      },
    }
  );
};

export const useDeleteTransaction = () => {
  return useMutation(
    async ({ id, token }: { id: number; token: string }) => {
      const response = await axiosInstance.delete(`/transactions/${id}`, {
        headers: { authorization: token },
      });
      return response.data;
    },
    {
      onError: () => {
        throw new Error('Failed to delete transaction');
      },
    }
  );
};

const IMPORT_TRANSACTIONS_MUTATION_KEY = 'importTransactions';

export const useImportTransactions = () => {
  return useMutation<void, Error, { data: Transaction[]; token: string }, unknown>(
    async ({ data, token }) => {
      const response = await axiosInstance.post(`/transactions/import`, data, {
        headers: { authorization: token },
      });
      return response.data;
    },
    {
      onError: (error: Error) => {
        console.error('Error importing transactions:', error);
        throw new Error('Failed to import transactions');
      },
      mutationKey: IMPORT_TRANSACTIONS_MUTATION_KEY,
    }
  );
};

export const useExportTransactions = () => {
  return useMutation(
    async ({ token, filters }: { token: string; filters: Filters }) => {
      const response = await axiosInstance.get('/transactions/export', {
        headers: { authorization: token },
        params: filters,
        responseType: 'blob',
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'transactions.csv');
        a.click();
      },
      onError: (error: Error) => {
        console.error('Error exporting transactions:', error);
        throw new Error('Failed to export transactions');
      },
    }
  );
};
