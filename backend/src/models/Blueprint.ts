import mongoose, { Document, Schema } from 'mongoose';

// 1. Define the Interface for TypeScript (Type Safety)
export interface IField {
  label: string;
  field_type: 'text' | 'date' | 'checkbox' | 'signature'; // Strict Enum
  required: boolean;
}

export interface IBlueprint extends Document {
  name: string;
  description?: string;
  fields: IField[];
  createdAt: Date;
}

// 2. Define the Mongoose Schema (Database Validation)
const FieldSchema = new Schema({
  label: { type: String, required: true },
  field_type: { 
    type: String, 
    enum: ['text', 'date', 'checkbox', 'signature'], // Backend Validation
    required: true 
  },
  required: { type: Boolean, default: false }
});

const BlueprintSchema = new Schema<IBlueprint>({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  fields: [FieldSchema], // Embed the fields array
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.model<IBlueprint>('Blueprint', BlueprintSchema);