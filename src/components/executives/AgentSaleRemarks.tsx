import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface Sale {
  id: string;
  date: string;
  agentName: string;
  subArea: string;
  milkType: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  unsoldQuantity: number;
  agentRemarks?: string;
  executiveRemarks?: string;
}

interface AgentSaleRemarksProps {
  sale: Sale;
  onRemarkAdded: () => void;
}

export default function AgentSaleRemarks({ sale, onRemarkAdded }: AgentSaleRemarksProps) {
  const [remarks, setRemarks] = useState(sale.executiveRemarks || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/sales/${sale.id}/executive-remarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remarks: remarks.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit remarks');
      }

      setMessage({ type: 'success', content: 'Remarks added successfully!' });
      setTimeout(() => setMessage({ type: '', content: '' }), 3000);
      onRemarkAdded();
    } catch (error) {
      setMessage({ type: 'error', content: 'Failed to add remarks. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {sale.agentName} - Sub Area {sale.subArea}
        </h3>
        <p className="text-sm text-gray-600">
          Date: {new Date(sale.date).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Sales Summary:</p>
          <ul className="mt-1 space-y-1">
            <li>Milk Type: {sale.milkType}</li>
            <li>Received: {sale.quantityReceived}L</li>
            <li>Sold: {sale.quantitySold}L</li>
            <li>Expired: {sale.quantityExpired}L</li>
            <li>Unsold: {sale.unsoldQuantity}L</li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-600">Agent's Remarks:</p>
          <p className="mt-1 text-gray-800">{sale.agentRemarks || 'No remarks added'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="executiveRemarks" className="block text-sm font-medium text-gray-700 mb-1">
            Your Remarks for this Agent
          </label>
          <textarea
            id="executiveRemarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add your observations about this agent's performance, issues, or recommendations..."
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting || !remarks.trim()}
            className={`px-4 py-2 rounded text-white ${
              isSubmitting || !remarks.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Remarks'}
          </button>

          {message.content && (
            <p className={`text-sm ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {message.content}
            </p>
          )}
        </div>
      </form>
    </div>
  );
} 