import mongoose from 'mongoose';

interface ISale {
  agentId: string;
  date: Date;
  milkType: string;
  quantityReceived: number;
  quantitySold: number;
  quantityExpired: number;
  unsoldQuantity: number;
  agentRemarks?: string;
  executiveRemarks?: string;
  executiveId?: string;
  executiveRemarkTime?: Date;
  zone: number;
  area: number;
  subArea: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ISaleDocument extends ISale, mongoose.Document {}

const SaleSchema = new mongoose.Schema<ISaleDocument>({
  agentId: {
    type: String,
    required: true,
    ref: 'User'
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
    type: String,
    ref: 'User'
  },
  executiveRemarkTime: {
    type: Date
  },
  zone: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  area: {
    type: Number,
    required: true,
    min: 1,
    max: 24,
    validate: {
      validator: function(this: ISaleDocument, value: number): boolean {
        if (!this.area) return true;
        if (value < 1 || value > 24) return false;
        const expectedZone = Math.ceil(value / 4);
        return this.zone === expectedZone;
      },
      message: 'Invalid area number or area does not belong to the assigned zone'
    }
  },
  subArea: {
    type: Number,
    required: true,
    min: 1,
    max: 480,
    validate: {
      validator: function(this: ISaleDocument, value: number): boolean {
        if (!this.subArea) return true;
        if (value < 1 || value > 480) return false;
        const expectedArea = Math.ceil(value / 20);
        return this.area === expectedArea;
      },
      message: 'Invalid sub-area number or sub-area does not belong to the assigned area'
    }
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
SaleSchema.pre('save', function(this: ISaleDocument, next) {
  this.unsoldQuantity = this.quantityReceived - this.quantitySold - this.quantityExpired;
  this.updatedAt = new Date();
  next();
});

// Ensure one entry per day per agent per milk type
SaleSchema.index({ agentId: 1, date: 1, milkType: 1 }, { unique: true });

// Try to get existing model, or compile new model
const Sale = mongoose.models.Sale || mongoose.model<ISaleDocument>('Sale', SaleSchema);

export default Sale; 