import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface DailySalesFormData {
  milkType: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  remarks?: string;
}

const MILK_TYPES = [
  { id: 'full_cream', name: 'Full Cream Milk' },
  { id: 'standardized', name: 'Standardized Milk' },
  { id: 'toned', name: 'Toned Milk' },
  { id: 'double_toned', name: 'Double Toned Milk' },
  { id: 'skimmed', name: 'Skimmed Milk' },
];

export default function DailySalesForm() {
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DailySalesFormData>();

  const quantityReceived = watch('quantityReceived') || 0;
  const quantitySold = watch('quantitySold') || 0;
  const quantityExpired = watch('quantityExpired') || 0;
  const unsoldQuantity = quantityReceived - quantitySold - quantityExpired;

  const onSubmit = async (data: DailySalesFormData) => {
    // Here we would submit the data to the backend
    console.log('Submitting data:', { ...data, unsoldQuantity });
  };

  const saveDraft = () => {
    const currentData = {
      milkType: watch('milkType'),
      quantityReceived: watch('quantityReceived'),
      quantitySold: watch('quantitySold'),
      quantityExpired: watch('quantityExpired'),
      remarks: watch('remarks'),
    };
    localStorage.setItem('salesDraft', JSON.stringify(currentData));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Daily Sales Entry</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Milk Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Milk Type
          </label>
          <select
            {...register('milkType', { required: 'Please select a milk type' })}
            className="input-field"
          >
            <option value="">Select milk type</option>
            {MILK_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.milkType && (
            <p className="text-error text-sm mt-1">{errors.milkType.message}</p>
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
            />
            {errors.quantityReceived && (
              <p className="text-error text-sm mt-1">{errors.quantityReceived.message}</p>
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
            />
            {errors.quantitySold && (
              <p className="text-error text-sm mt-1">{errors.quantitySold.message}</p>
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
            />
            {errors.quantityExpired && (
              <p className="text-error text-sm mt-1">{errors.quantityExpired.message}</p>
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
            Remarks (Optional)
          </label>
          <textarea
            {...register('remarks')}
            className="input-field h-24"
            placeholder="Add any additional notes here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            Submit Entry
          </button>
          <button
            type="button"
            onClick={saveDraft}
            className="btn-secondary"
          >
            Save Draft
          </button>
        </div>

        {/* Draft Saved Notification */}
        {isDraftSaved && (
          <div className="text-success text-sm text-center mt-2">
            Draft saved successfully!
          </div>
        )}
      </form>
    </div>
  );
} 