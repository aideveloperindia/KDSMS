import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Drop any existing phone index if it exists
try {
  if (mongoose.models.User) {
    delete mongoose.models.User;
  }
} catch (error) {
  console.error('Error cleaning up model:', error);
}

interface IUser {
  name: string;
  employeeId: string;
  password: string;
  role: 'agent' | 'executive' | 'zm' | 'agm' | 'management';
  zone?: number;
  zoneName?: string;
  area?: number;
  areaName?: string;
  subArea?: number;
  subAreaName?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserDocument extends IUser, mongoose.Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends mongoose.Model<IUserDocument> {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['agent', 'executive', 'zm', 'agm', 'management']
  },
  zone: {
    type: Number,
    required: function(this: IUserDocument): boolean {
      return ['agent', 'executive', 'zm'].includes(this.role);
    }
  },
  zoneName: {
    type: String,
    trim: true
  },
  area: {
    type: Number,
    required: function(this: IUserDocument): boolean {
      return ['agent', 'executive'].includes(this.role);
    }
  },
  areaName: {
    type: String,
    trim: true
  },
  subArea: {
    type: Number,
    required: function(this: IUserDocument): boolean {
      return this.role === 'agent';
    }
  },
  subAreaName: {
    type: String,
    trim: true,
    required: function(this: IUserDocument): boolean {
      return this.role === 'agent';
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
UserSchema.pre('save', function(this: IUserDocument, next) {
  this.updatedAt = new Date();
  next();
});

// Hash password before saving
UserSchema.pre('save', async function(this: IUserDocument, next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check password
UserSchema.methods.comparePassword = async function(this: IUserDocument, candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Drop the existing model to apply schema changes
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default User; 