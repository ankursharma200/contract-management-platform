import mongoose, { Document } from 'mongoose';
export interface IField {
    label: string;
    field_type: 'text' | 'date' | 'checkbox' | 'signature';
    required: boolean;
}
export interface IBlueprint extends Document {
    name: string;
    description?: string;
    fields: IField[];
    createdAt: Date;
}
declare const _default: mongoose.Model<IBlueprint, {}, {}, {}, mongoose.Document<unknown, {}, IBlueprint, {}, mongoose.DefaultSchemaOptions> & IBlueprint & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBlueprint>;
export default _default;
//# sourceMappingURL=Blueprint.d.ts.map