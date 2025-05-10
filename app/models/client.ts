import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive';
  type: 'individual' | 'company';
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { 
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  type: {
    type: String,
    enum: ['individual', 'company'],
    default: 'individual'
  }
});

ClientSchema.index({ name: 'text', email: 'text' });

export default mongoose.models.Client as mongoose.Model<IClient> || 
  mongoose.model<IClient>('Client', ClientSchema);