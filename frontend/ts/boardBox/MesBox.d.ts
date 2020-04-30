import React from "react";
export { MesBox };
interface MesBoxProps {
}
interface MesBoxStates {
    comments: Array<any>;
    initialReplys: [][];
}
declare class MesBox extends React.Component<MesBoxProps, MesBoxStates> {
    publish: any;
    constructor(props: MesBoxProps);
    componentDidMount(): void;
    OnRef(ref: any): void;
    handlePublish(m: any): void;
    handleComment(): any;
    render(): JSX.Element;
}
