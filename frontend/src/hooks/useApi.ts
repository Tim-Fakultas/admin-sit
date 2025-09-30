import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

interface UseApiDataOptions<T> {
  endpoint: string;
  initialData?: T;
  transform?: (data: any) => T;
  dependencies?: any[];
}

export function useApiData<T>({ 
  endpoint, 
  initialData = null as T, 
  transform,
  dependencies = [] 
}: UseApiDataOptions<T>) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await apiClient.get(endpoint);
      const transformedData = transform ? transform(response.data) : response.data;
      setData(transformedData);
    } catch (err) {
      setError('Gagal memuat data');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) {
      fetchData();
    }
  }, [endpoint, ...dependencies]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    setData
  };
}

// Hook untuk form submission
export function useApiSubmit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const submit = async (submitFunction: () => Promise<any>) => {
    try {
      setIsLoading(true);
      setError('');
      const result = await submitFunction();
      return result;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Terjadi kesalahan';
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submit,
    isLoading,
    error,
    setError
  };
}