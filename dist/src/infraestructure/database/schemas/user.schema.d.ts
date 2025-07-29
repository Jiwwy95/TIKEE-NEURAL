import { Document } from 'mongoose';
export declare class UserModel {
    email: string;
    password: string;
    name: string;
    roles: string[];
    role: string;
    activeModules: string[];
}
export type UserDocument = UserModel & Document;
export declare const UserSchema: import("mongoose").Schema<UserModel, import("mongoose").Model<UserModel, any, any, any, Document<unknown, any, UserModel, any> & UserModel & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserModel, Document<unknown, {}, import("mongoose").FlatRecord<UserModel>, {}> & import("mongoose").FlatRecord<UserModel> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
