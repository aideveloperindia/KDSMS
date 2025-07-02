'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface DailySalesFormData {
  milkType: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  agentRemarks?: string;
}

const MILK_TYPES = [
  { id: 'full_cream', name: 'Full Cream Milk' },
  { id: 'standardized', name: 'Standardized Milk' },
  { id: 'toned', name: 'Toned Milk' },
  { id: 'double_toned', name: 'Double Toned Milk' },
  { id: 'skimmed', name: 'Skimmed Milk' },
];

export default function DailySalesForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DailySalesFormData>();

  const quantityReceived = watch('quantityReceived') || 0;
  const quantitySold = watch('quantitySold') || 0;
  const quantityExpired = watch('quantityExpired') || 0;
  const unsoldQuantity = quantityReceived - quantitySold - quantityExpired;

  useEffect(() => {
    // Load draft on component mount
    const savedDraft = localStorage.getItem('salesDraft');
    if (savedDraft) {
      try {
        const data = JSON.parse(savedDraft) as DailySalesFormData;
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as keyof DailySalesFormData, value as any);
        });
      } catch (error) {
        console.error('Error loading draft:', error);
        localStorage.removeItem('salesDraft');
      }
    }
  }, [setValue]);

  const onSubmit = async (data: DailySalesFormData) => {
    if (status !== 'authenticated') {
      setSubmitError('You must be signed in to submit sales data');
      router.push('/auth/login');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          date: new Date().toISOString(),
          unsoldQuantity
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit sales data');
      }

      // Clear form after successful submission
      setValue('milkType', '');
      setValue('quantityReceived', 0);
      setValue('quantitySold', 0);
      setValue('quantityExpired', 0);
      setValue('agentRemarks', '');

      // Clear draft from localStorage
      localStorage.removeItem('salesDraft');
      
      // Show success message and redirect
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting sales:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit sales data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveDraft = () => {
    const currentData = {
      milkType: watch('milkType'),
      quantityReceived: watch('quantityReceived'),
      quantitySold: watch('quantitySold'),
      quantityExpired: watch('quantityExpired'),
      agentRemarks: watch('agentRemarks'),
    };
    localStorage.setItem('salesDraft', JSON.stringify(currentData));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  if (status === 'loading') {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="text-center py-4">
        <p className="text-red-600">Please sign in to submit sales data</p>
        <button
          onClick={() => router.push('/auth/login')}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Daily Sales Entry</h2>

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Milk Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Milk Type
          </label>
          <select
            {...register('milkType', { required: 'Please select a milk type' })}
            className="input-field"
            disabled={isSubmitting}
          >
            <option value="">Select milk type</option>
            {MILK_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.milkType && (
            <p className="text-red-600 text-sm mt-1">{errors.milkType.message}</p>
          )}
        </div>

        {/* Quantity Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity Received (L)
            </label>
            <input
              type="number"
              {...register('quantityReceived', {
                required: 'This field is required',
                min: { value: 0, message: 'Value must be positive' }
              })}
              className="input-field"
              step="0.1"
              disabled={isSubmitting}
            />
            {errors.quantityReceived && (
              <p className="text-red-600 text-sm mt-1">{errors.quantityReceived.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity Sold (L)
            </label>
            <input
              type="number"
              {...register('quantitySold', {
                required: 'This field is required',
                min: { value: 0, message: 'Value must be positive' },
                max: { value: quantityReceived, message: 'Cannot sell more than received' }
              })}
              className="input-field"
              step="0.1"
              disabled={isSubmitting}
            />
            {errors.quantitySold && (
              <p className="text-red-600 text-sm mt-1">{errors.quantitySold.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity Expired (L)
            </label>
            <input
              type="number"
              {...register('quantityExpired', {
                required: 'This field is required',
                min: { value: 0, message: 'Value must be positive' },
                max: { value: quantityReceived - quantitySold, message: 'Invalid expired quantity' }
              })}
              className="input-field"
              step="0.1"
              disabled={isSubmitting}
            />
            {errors.quantityExpired && (
              <p className="text-red-600 text-sm mt-1">{errors.quantityExpired.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unsold Quantity (L)
            </label>
            <input
              type="number"
              value={unsoldQuantity}
              className="input-field bg-gray-50"
              disabled
            />
          </div>
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Remarks for Today
          </label>
          <textarea
            {...register('agentRemarks')}
            className="input-field h-24"
            placeholder="Add your remarks about today's sales, any issues, or special observations..."
            disabled={isSubmitting}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Entry'}
          </button>
          <button
            type="button"
            onClick={saveDraft}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Save Draft
          </button>
        </div>

        {/* Draft Saved Notification */}
        {isDraftSaved && (
          <div className="text-green-600 text-sm text-center mt-2">
            Draft saved successfully!
          </div>
        )}
      </form>
    </div>
  );
} 