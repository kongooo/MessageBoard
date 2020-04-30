import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comment } from "./Comment";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    index: number;

    @Column({
        length: 12
    })
    name: string;

    @Column("varchar")
    email: string;

    @Column("datetime")
    time: string;

    @Column("text")
    content: string;

    @OneToMany(type => Comment, comment => comment.message,
        { cascade: true })
    comments: Comment[];
}
