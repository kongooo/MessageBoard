export { GetMessages, SaveMessage, SaveComment };
declare function GetMessages(): Promise<any>;
declare function SaveMessage(message: any): Promise<any>;
declare function SaveComment(comment: any): Promise<void>;
