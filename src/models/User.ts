import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[0-9]{10}$/
  },
  role: {
    type: String,
    required: true,
    enum: ['Agent', 'Executive', 'ZM', 'AGM', 'Management']
  },
  area: {
    type: String,
    required: function() {
      return ['Agent', 'Executive'].includes(this.role);
    },
    trim: true
  },
  subArea: {
    type: String,
    required: function() {
      return this.role === 'Agent';
    },
    trim: true
  },
  zone: {
    type: String,
    required: function() {
      return ['Agent', 'Executive', 'ZM'].includes(this.role);
    },
    trim: true
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.role === 'Agent';
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
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
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema); 