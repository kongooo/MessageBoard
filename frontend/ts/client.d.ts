export { GetMessages, GetComments, SaveMessage, SaveComment };
declare function GetMessages(): Promise<string>;
declare function GetComments(): Promise<string>;
declare function SaveMessage(message: any): Promise<void>;
declare function SaveComment(comment: any): Promise<void>;
