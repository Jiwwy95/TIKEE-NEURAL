export declare class ChatMessage {
    question: string;
    answer: string;
    timestamp: Date;
    constructor(question: string, answer: string, timestamp?: Date);
}
export declare class Chat {
    id: string;
    userId: string;
    question?: string | undefined;
    answer?: string | undefined;
    module?: string | undefined;
    createdAt: Date;
    messages?: ChatMessage[] | undefined;
    constructor(id: string, userId: string, question?: string | undefined, answer?: string | undefined, module?: string | undefined, createdAt?: Date, messages?: ChatMessage[] | undefined);
}
