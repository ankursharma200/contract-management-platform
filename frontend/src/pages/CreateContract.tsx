import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createContract } from '../services/contractService';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import { fetchBlueprints } from '../services/blueprintService';
import type { IBlueprint, IField } from '../services/blueprintService';
const CreateContract = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // State
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('');
  const [contractName, setContractName] = useState('');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [error, setError] = useState('');

  // 1. Fetch Blueprints
  const { data: blueprints, isLoading } = useQuery({
    queryKey: ['blueprints'],
    queryFn: fetchBlueprints,
  });

  // 2. Mutation to Create Contract
  const mutation = useMutation({
    mutationFn: createContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      navigate('/'); // Go back to dashboard
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create contract');
    }
  });

  // Helper: Find selected blueprint object
  const selectedBlueprint = blueprints?.find(b => b._id === selectedBlueprintId);

  // Helper: Handle Form Input Changes
  const handleInputChange = (fieldKey: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldKey]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBlueprintId || !contractName) {
      setError('Please select a blueprint and enter a name.');
      return;
    }
    
    mutation.mutate({
      blueprintId: selectedBlueprintId,
      name: contractName,
      formData
    });
  };

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Contract</h1>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Contract Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Contract Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g. Non-Disclosure Agreement for Vendor X"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              required
            />
          </div>

          {/* 2. Blueprint Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Select Blueprint</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={selectedBlueprintId}
              onChange={(e) => {
                setSelectedBlueprintId(e.target.value);
                setFormData({}); // Reset form data when blueprint changes
              }}
              required
            >
              <option value="">-- Choose a Template --</option>
              {blueprints?.map((bp: IBlueprint) => (
                <option key={bp._id} value={bp._id}>{bp.name}</option>
              ))}
            </select>
          </div>

          {/* 3. Dynamic Fields Section */}
          {selectedBlueprint && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Contract Details</h3>
              
              <div className="space-y-4">
                {selectedBlueprint.fields.map((field: IField, index: number) => {
                  // Use _id or generate a fallback key based on label
                  const fieldKey = field.key || field.label.toLowerCase().replace(/\s+/g, '_');

                  return (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      
                      {/* RENDER LOGIC SWITCH */}
                      {field.field_type === 'text' && (
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded p-2"
                          onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                          required={field.required}
                        />
                      )}
                      
                      {field.field_type === 'date' && (
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded p-2"
                          onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                          required={field.required}
                        />
                      )}

                      {field.field_type === 'checkbox' && (
                        <div className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            onChange={(e) => handleInputChange(fieldKey, e.target.checked)}
                          />
                          <span className="ml-2 text-gray-600">Yes, I agree</span>
                        </div>
                      )}

                      {field.field_type === 'signature' && (
                        <input
                          type="text"
                          placeholder="Type full name to sign"
                          className="w-full border-b-2 border-gray-300 bg-transparent p-2 italic font-serif text-lg focus:border-blue-600 outline-none"
                          onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                          required={field.required}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
          >
            {mutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
            Create Contract
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContract;