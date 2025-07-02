import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AddRemark() {
  const [remark, setRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remark.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/remarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: remark }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit remark');
      }

      setRemark('');
      setMessage({ type: 'success', content: 'Remark added successfully!' });
      setTimeout(() => setMessage({ type: '', content: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', content: 'Failed to add remark. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Remark</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
            Your Remark
          </label>
          <textarea
            id="remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your remark here..."
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting || !remark.trim()}
            className={`px-4 py-2 rounded text-white ${
              isSubmitting || !remark.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Adding...' : 'Add Remark'}
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