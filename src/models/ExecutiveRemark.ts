import mongoose from 'mongoose';

const ExecutiveRemarkSchema = new mongoose.Schema({
  executiveId: {
    type: mongoose.Schema.Types.ObjectId,
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
ExecutiveRemarkSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Try to get existing model, or compile new model
const ExecutiveRemark = mongoose.models.ExecutiveRemark || mongoose.model('ExecutiveRemark', ExecutiveRemarkSchema);

export default ExecutiveRemark; 