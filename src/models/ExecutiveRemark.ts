import mongoose from 'mongoose';

interface IExecutiveRemark {
  executiveId: string;
  agentId: string;
  date: Date;
  content: string;
  zone: number;
  area: number;
  subArea: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IExecutiveRemarkDocument extends IExecutiveRemark, mongoose.Document {}

const ExecutiveRemarkSchema = new mongoose.Schema<IExecutiveRemarkDocument>({
  executiveId: {
    type: String,
    ref: 'User',
    required: true
  },
  agentId: {
    type: String,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  content: {
    type: String,
    required: true,
    trim: true
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
      validator: function(this: IExecutiveRemarkDocument, value: number): boolean {
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
      validator: function(this: IExecutiveRemarkDocument, value: number): boolean {
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

// Update timestamps on save
ExecutiveRemarkSchema.pre('save', function(this: IExecutiveRemarkDocument, next) {
  this.updatedAt = new Date();
  next();
});

// Ensure one executive can only add one remark per agent per day
ExecutiveRemarkSchema.index({ executiveId: 1, agentId: 1, date: 1 }, { unique: true });

// Try to get existing model, or compile new model
const ExecutiveRemark = mongoose.models.ExecutiveRemark || mongoose.model<IExecutiveRemarkDocument>('ExecutiveRemark', ExecutiveRemarkSchema);

export default ExecutiveRemark; 