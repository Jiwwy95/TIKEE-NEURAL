import { Schema, Document } from 'mongoose';

export interface LogEntryDocument extends Document {
  userId: string;
  question: string;
  answer: string;
  timestamp: Date;
  module?: string;
}

export const LogEntrySchema = new Schema<LogEntryDocument>(
  {
    userId: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    timestamp: { type: Date, default: () => new Date() },
    module: { type: String, default: 'general' },
  },
  {
    versionKey: false,
  }
);