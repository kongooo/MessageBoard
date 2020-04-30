import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Message } from "./Message";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 12
    })
    name: string;

    @Column({
        length: 12
    })
    replyName: string;

    @Column("text")
    content: string;

    @ManyToOne(type => Message, message => message.comments)
    message: Message;
}
