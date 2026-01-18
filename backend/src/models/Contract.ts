import mongoose, { Document, Schema } from 'mongoose';

// 1. Define Interface
export interface IContract extends Document {
  blueprintId: mongoose.Types.ObjectId;
  name: string; // Contract Name
  status: 'created' | 'approved' | 'sent' | 'signed' | 'revoked';
  formData: Record<string, any>; // Stores the dynamic values (answers)
  history: { status: string; timestamp: Date }[]; // For the Timeline view
}

// 2. Define Schema
const ContractSchema = new Schema<IContract>({
  blueprintId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Blueprint', 
    required: true 
  },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['created', 'approved', 'sent', 'signed', 'revoked'],
    default: 'created'
  },
  formData: { 
    type: Map, 
    of: Schema.Types.Mixed, // Allows storing flexible data based on Blueprint
    default: {} 
  },
  history: [{
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IContract>('Contract', ContractSchema);