import api from '../api/axios';

export interface IField {
  label: string;
  field_type: 'text' | 'date' | 'checkbox' | 'signature';
  required: boolean;
  key?: string; // We will generate this in UI if missing
}

export interface IBlueprint {
  _id: string;
  name: string;
  description?: string;
  fields: IField[];
  createdAt: string;
}

export const fetchBlueprints = async (): Promise<IBlueprint[]> => {
  const { data } = await api.get('/blueprints');
  return data;
};

export const createBlueprint = async (blueprintData: Partial<IBlueprint>) => {
  const { data } = await api.post('/blueprints', blueprintData);
  return data;
};

export const fetchBlueprintById = async (id: string): Promise<IBlueprint> => {
  const { data } = await api.get(`/blueprints/${id}`);
  return data;
};