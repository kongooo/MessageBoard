import { Comment } from "./Comment";
export declare class Message {
    id: number;
    index: number;
    name: string;
    email: string;
    time: string;
    content: string;
    comments: Comment[];
}
