import { useQuery } from '@tanstack/react-query';
import { fetchContracts } from '../services/contractService';
import { Link } from 'react-router-dom';
import { FileSignature, Loader2 } from 'lucide-react';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'signed': return 'bg-green-100 text-green-800';
    case 'approved': return 'bg-blue-100 text-blue-800';
    case 'revoked': return 'bg-red-100 text-red-800';
    case 'sent': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Dashboard = () => {
  const { data: contracts, isLoading, error } = useQuery({
    queryKey: ['contracts'],
    queryFn: () => fetchContracts(),
  });

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
  if (error) return <div className="text-red-500 p-10">Error loading contracts</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Contract Dashboard</h2>
        <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + New Contract
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Contract Name</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Blueprint</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Created</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contracts?.map((contract) => (
              <tr key={contract._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{contract.name}</td>
                <td className="px-6 py-4 text-gray-500">
                  {typeof contract.blueprintId === 'object' ? contract.blueprintId.name : 'Unknown'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(contract.status)}`}>
                    {contract.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(contract.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <Link 
                    to={`/contracts/${contract._id}`} 
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    <FileSignature size={16} className="mr-1" /> View
                  </Link>
                </td>
              </tr>
            ))}
            {contracts?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  No contracts found. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;