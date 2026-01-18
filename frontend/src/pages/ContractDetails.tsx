import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchContracts, updateContractStatus } from '../services/contractService';
import { Loader2, ArrowLeft, CheckCircle, Send, PenTool, XCircle, Lock } from 'lucide-react';

const ContractDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1. Fetch Contract Data
  // (We reuse fetchContracts and filter client-side for simplicity in this demo, 
  // normally you'd have a specific getContractById endpoint)
  const { data: contracts, isLoading } = useQuery({
    queryKey: ['contracts'],
    queryFn: () => fetchContracts(),
  });
  
  const contract = contracts?.find((c) => c._id === id);

  // 2. Mutation for Status Update
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      updateContractStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  });

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
  if (!contract) return <div className="p-10 text-red-500">Contract not found</div>;

  // Helper: Determine available actions based on current status
  const getAvailableActions = (status: string) => {
    switch (status) {
      case 'created':
        return [
          { label: 'Approve', value: 'approved', icon: <CheckCircle size={16} />, color: 'bg-blue-600 hover:bg-blue-700' },
          { label: 'Revoke', value: 'revoked', icon: <XCircle size={16} />, color: 'bg-red-600 hover:bg-red-700' }
        ];
      case 'approved':
        return [
          { label: 'Send to Client', value: 'sent', icon: <Send size={16} />, color: 'bg-yellow-600 hover:bg-yellow-700' }
        ];
      case 'sent':
        return [
          { label: 'Sign Contract', value: 'signed', icon: <PenTool size={16} />, color: 'bg-green-600 hover:bg-green-700' },
          { label: 'Revoke', value: 'revoked', icon: <XCircle size={16} />, color: 'bg-red-600 hover:bg-red-700' }
        ];
      default:
        return [];
    }
  };

  const actions = getAvailableActions(contract.status);

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
      </button>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{contract.name}</h1>
            <p className="text-gray-500">ID: {contract._id}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500 mb-1">Current Status</span>
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide
              ${contract.status === 'signed' ? 'bg-green-100 text-green-800' : 
                contract.status === 'revoked' ? 'bg-red-100 text-red-800' : 
                'bg-blue-100 text-blue-800'}`}>
              {contract.status}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        {actions.length > 0 ? (
          <div className="mt-8 flex gap-4 pt-6 border-t border-gray-100">
            {actions.map((action) => (
              <button
                key={action.value}
                onClick={() => statusMutation.mutate({ id: contract._id, status: action.value })}
                disabled={statusMutation.isPending}
                className={`flex items-center px-4 py-2 rounded-lg text-white font-medium transition ${action.color}`}
              >
                {statusMutation.isPending ? <Loader2 className="animate-spin mr-2" size={16}/> : <span className="mr-2">{action.icon}</span>}
                {action.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex items-center text-gray-500 pt-6 border-t border-gray-100">
            <Lock size={16} className="mr-2" />
            <span>This contract is finalized and cannot be modified.</span>
          </div>
        )}
      </div>

      {/* Contract Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Form Data */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Contract Data</h2>
          <div className="space-y-4">
            {Object.entries(contract.formData || {}).map(([key, value]) => (
              <div key={key} className="border-b border-gray-50 pb-3 last:border-0">
                <span className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className="text-gray-800 font-medium">
                  {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: History Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Timeline</h2>
          <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
            {contract.history?.map((event, idx) => (
              <div key={idx} className="relative pl-6">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></span>
                <p className="text-sm font-bold text-gray-900 capitalize">{event.status}</p>
                <p className="text-xs text-gray-500">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;