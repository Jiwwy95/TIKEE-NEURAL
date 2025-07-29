import { Document } from 'mongoose';
export type ChatDocument = ChatModel & Document;
export declare class ChatModel {
    _id: string;
    id: string;
    userId: string;
    module?: string;
    createdAt: Date;
    messages: {
        question: string;
        answer: string;
        timestamp: Date;
    }[];
}
export declare const ChatSchema: import("mongoose").Schema<ChatModel, import("mongoose").Model<ChatModel, any, any, any, Document<unknown, any, ChatModel, any> & ChatModel & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChatModel, Document<unknown, {}, import("mongoose").FlatRecord<ChatModel>, {}> & import("mongoose").FlatRecord<ChatModel> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
