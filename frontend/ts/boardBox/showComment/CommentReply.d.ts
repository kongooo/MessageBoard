import React from "react";
import "../../../css/reply.scss";
export { CommentReply };
interface ReplyBoxProps {
    reply: any;
    onSubmit: any;
}
declare class CommentReply extends React.Component<ReplyBoxProps> {
    constructor(props: ReplyBoxProps);
    handleSubmit(): void;
    render(): JSX.Element;
}
