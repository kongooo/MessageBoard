import React from "react";
export { PublishBox };
interface PublishBoxProps {
    onSubmit: any;
    OnRef: any;
}
interface PublishBoxStates {
    name: string;
    email: string;
    content: string;
    nameHint: boolean;
    emailHint: boolean;
}
declare class PublishBox extends React.Component<PublishBoxProps, PublishBoxStates> {
    image: HTMLImageElement;
    constructor(props: PublishBoxProps);
    componentDidMount(): void;
    handleNameChange(e: any): void;
    handleEmailChange(e: any): void;
    handleOnBlur(): Promise<void>;
    handleContentChange(e: any): void;
    judgeName(): string | false;
    judgeNameAndEmail(): boolean;
    handleSubmit(): void;
    render(): JSX.Element;
}
