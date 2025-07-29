import { Schema, Document } from 'mongoose';
export interface LogEntryDocument extends Document {
    userId: string;
    question: string;
    answer: string;
    timestamp: Date;
    module?: string;
}
export declare const LogEntrySchema: Schema<LogEntryDocument, import("mongoose").Model<LogEntryDocument, any, any, any, Document<unknown, any, LogEntryDocument, any> & LogEntryDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LogEntryDocument, Document<unknown, {}, import("mongoose").FlatRecord<LogEntryDocument>, {}> & import("mongoose").FlatRecord<LogEntryDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
