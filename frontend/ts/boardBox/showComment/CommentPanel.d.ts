import React from "react";
import "../../../css/commentPanel.scss";
export { CommentPanel };
interface CommentPanelProps {
    OnRef: any;
    onSubmit: any;
}
interface CommentPanelStates {
    show: boolean;
    content: string;
    name: string;
}
declare class CommentPanel extends React.Component<CommentPanelProps, CommentPanelStates> {
    constructor(props: CommentPanelProps);
    componentDidMount(): void;
    handleReplySubmit(): void;
    updateName(newName: string): void;
    handlePanelDis(): void;
    handlePanelShow(): void;
    handleContentChange(e: any): void;
    preventDis(e: any): void;
    render(): JSX.Element;
}
