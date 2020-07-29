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
    observer: IntersectionObserver;
    constructor(props: MesBoxProps);
    componentDidMount(): void;
    initObserver(): void;
    loadImage(e: HTMLImageElement): void;
    OnRef(ref: any): void;
    handleRegister(item: HTMLImageElement): void;
    handlePublish(m: any): void;
    handleComment(): any;
    render(): JSX.Element;
}
