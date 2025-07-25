export class ChatMessage {
  constructor(
    public question: string,
    public answer: string,
    public timestamp: Date = new Date(),
  ) {}
}

export class Chat {
  constructor(
    public id: string, 
    public userId: string,
    public question?: string,
    public answer?: string,
    public module?:string,
    public createdAt: Date = new Date(),
    public messages?:ChatMessage[],
  ) {}
}
