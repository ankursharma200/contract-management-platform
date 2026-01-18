import api from '../api/axios';
import type { IBlueprint } from './blueprintService';

export interface IContract {
  _id: string;
  blueprintId: IBlueprint | string; // Populated or ID
  name: string;
  status: 'created' | 'approved' | 'sent' | 'signed' | 'revoked';
  formData: Record<string, any>;
  history: { status: string; timestamp: string }[];
  createdAt: string;
}

export const fetchContracts = async (status?: string): Promise<IContract[]> => {
  const params = status ? { status } : {};
  const { data } = await api.get('/contracts', { params });
  return data;
};

export const createContract = async (payload: { blueprintId: string; name: string; formData?: any }) => {
  const { data } = await api.post('/contracts', payload);
  return data;
};

export const updateContractStatus = async (id: string, status: string) => {
  const { data } = await api.patch(`/contracts/${id}/status`, { status });
  return data;
};

export const updateContractData = async (id: string, formData: any) => {
  const { data } = await api.put(`/contracts/${id}`, { formData });
  return data;
};