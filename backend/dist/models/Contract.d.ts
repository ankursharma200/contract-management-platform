import mongoose, { Document } from 'mongoose';
export interface IContract extends Document {
    blueprintId: mongoose.Types.ObjectId;
    name: string;
    status: 'created' | 'approved' | 'sent' | 'signed' | 'revoked';
    formData: Record<string, any>;
    history: {
        status: string;
        timestamp: Date;
    }[];
}
declare const _default: mongoose.Model<IContract, {}, {}, {}, mongoose.Document<unknown, {}, IContract, {}, mongoose.DefaultSchemaOptions> & IContract & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IContract>;
export default _default;
//# sourceMappingURL=Contract.d.ts.map