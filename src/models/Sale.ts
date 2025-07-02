import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  milkType: {
    type: String,
    required: true,
    enum: ['full_cream', 'standardized', 'toned', 'double_toned', 'skimmed']
  },
  quantityReceived: {
    type: Number,
    required: true,
    min: 0
  },
  quantitySold: {
    type: Number,
    required: true,
    min: 0
  },
  quantityExpired: {
    type: Number,
    required: true,
    min: 0
  },
  unsoldQuantity: {
    type: Number,
    min: 0,
    default: 0
  },
  agentRemarks: {
    type: String,
    trim: true
  },
  executiveRemarks: {
    type: String,
    trim: true
  },
  executiveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  executiveRemarkTime: {
    type: Date
  },
  subArea: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  zone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate unsold quantity before saving
SaleSchema.pre('save', function(next) {
  this.unsoldQuantity = this.quantityReceived - this.quantitySold - this.quantityExpired;
  this.updatedAt = new Date();
  next();
});

// Ensure one entry per day per user per milk type
SaleSchema.index({ userId: 1, date: 1, milkType: 1 }, { unique: true });

// Try to get existing model, or compile new model
const Sale = mongoose.models.Sale || mongoose.model('Sale', SaleSchema);

export default Sale; 