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
  subAreaCode?: string;
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
    },
    min: 1,
    max: 6,
    validate: {
      validator: function(this: IUserDocument, value: number): boolean {
        return !this.zone || (value >= 1 && value <= 6);
      },
      message: 'Zone number must be between 1 and 6'
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
    },
    min: 1,
    max: 24,
    validate: {
      validator: function(this: IUserDocument, value: number): boolean {
        if (!this.area) return true;
        if (value < 1 || value > 24) return false;
        const expectedZone = Math.ceil(value / 4);
        return this.zone === expectedZone;
      },
      message: 'Invalid area number or area does not belong to the assigned zone'
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
    },
    min: 1,
    max: 480,
    validate: {
      validator: function(this: IUserDocument, value: number): boolean {
        if (!this.subArea) return true;
        if (value < 1 || value > 480) return false;
        const expectedArea = Math.ceil(value / 20);
        return this.area === expectedArea;
      },
      message: 'Invalid sub-area number or sub-area does not belong to the assigned area'
    }
  },
  subAreaName: {
    type: String,
    trim: true
  },
  subAreaCode: {
    type: String,
    trim: true
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

const User = (mongoose.models.User as IUserModel) || mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default User; 