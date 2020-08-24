import React from "react";
import "../../../css/message.scss";
export { MessageBox };
interface MessageBoxProps {
    comment: any;
    onSubmit: any;
    register: Function;
}
interface MessageBoxStates {
    replys: Array<any>;
}
declare class MessageBox extends React.Component<MessageBoxProps, MessageBoxStates> {
    child: any;
    currentName: string;
    currentReplyName: string;
    constructor(props: MessageBoxProps);
    componentDidMount(): void;
    handlePanelShow(n: string, c: boolean): void;
    handleCommentSubmit(c: any): void;
    handleCommentPanelShow(): void;
    handleReplyPanelShow(m: any): void;
    OnRef(ref: any): void;
    render(): JSX.Element;
}
