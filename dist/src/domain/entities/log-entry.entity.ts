export class LogEntry {
    constructor(
      public id: string, 
      public userId: string,
      public question: string,
      public timestamp: Date,
      public answer: string = '',
      public module: string = 'general',

    ) {}
  }