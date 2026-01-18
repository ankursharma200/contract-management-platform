import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlueprints, createBlueprint } from '../services/blueprintService';
import type { IBlueprint } from '../services/blueprintService'; // Note: Type import!
import { Loader2, Plus } from 'lucide-react';

const Blueprints = () => {
  const queryClient = useQueryClient();
  const { data: blueprints, isLoading } = useQuery({
    queryKey: ['blueprints'],
    queryFn: fetchBlueprints,
  });

  const mutation = useMutation({
    mutationFn: createBlueprint,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blueprints'] }),
  });

  // Quick Seeder for Demo
  const handleCreateDefault = () => {
    mutation.mutate({
      name: "Standard NDA " + Math.floor(Math.random() * 100),
      description: "Standard Non-Disclosure Agreement",
      fields: [
        { label: "Effective Date", field_type: "date", required: true },
        { label: "Vendor Name", field_type: "text", required: true },
        { label: "Confidentiality Term (Years)", field_type: "text", required: false },
        { label: "Accept Terms", field_type: "checkbox", required: true },
        { label: "Signature", field_type: "signature", required: true }
      ]
    });
  };

  if (isLoading) return <div className="p-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blueprints</h1>
        <button 
          onClick={handleCreateDefault} 
          disabled={mutation.isPending}
          className="bg-gray-800 text-white px-4 py-2 rounded flex items-center hover:bg-black transition"
        >
          {mutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} className="mr-2" />}
          Seed Demo Blueprint
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blueprints?.map((bp: IBlueprint) => (
          <div key={bp._id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">{bp.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{bp.description}</p>
            <div className="flex flex-wrap gap-2">
              {bp.fields.map((f, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  {f.field_type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blueprints;