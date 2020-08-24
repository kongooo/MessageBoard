import React from "react";

import { PublishBox } from "./publishComment/PublishBox";
import { MessageBox } from "./showComment/MessageBox";

import { GetMessages } from "../client";

export { MesBox };

interface MesBoxProps {}

interface MesBoxStates {
  comments: Array<any>;
  initialReplys: [][];
}

class MesBox extends React.Component<MesBoxProps, MesBoxStates> {
  publish: any;
  observer: IntersectionObserver;

  constructor(props: MesBoxProps) {
    super(props);

    this.state = {
      comments: [],
      initialReplys: [],
    };

    this.handlePublish = this.handlePublish.bind(this);
    this.OnRef = this.OnRef.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.initObserver();
  }

  componentDidMount() {
    Promise.resolve(GetMessages()).then(async (result) => {
      // let t = JSON.parse(result);
      this.setState({ comments: result.reverse() });
    });
    // .then(async () => {
    //   Promise.resolve(GetComments()).then((r) => {
    //     let t = JSON.parse(r);
    //     this.setState({ initialReplys: t.reverse() });
    //   });
    // });
  }

  initObserver() {
    this.observer = new IntersectionObserver((ioes) => {
      ioes.forEach((ioe) => {
        const e = ioe.target as HTMLImageElement;
        const ratio = ioe.intersectionRatio;
        if (ratio > 0 && ratio <= 1) {
          this.loadImage(e);
        }
        e.onload = e.onerror = () => {
          this.observer.unobserve(e);
        };
      });
    });
  }

  loadImage(e: HTMLImageElement) {
    if (!e.src) {
      e.src = e.dataset.src;
    }
  }

  OnRef(ref: any) {
    this.publish = ref;
  }

  handleRegister(item: HTMLImageElement) {
    this.observer.observe(item);
  }

  handlePublish(m: any) {
    this.state.comments.unshift(m);
    this.setState({
      comments: this.state.comments,
    });
  }

  handleComment() {
    return this.publish.judgeName();
  }

  render() {
    return (
      <div className="mes-box">
        <PublishBox OnRef={this.OnRef} onSubmit={this.handlePublish} />
        <div>
          {this.state.comments.map((comment, i) => (
            <MessageBox
              onSubmit={this.handleComment}
              comment={comment}
              key={this.state.comments.length - 1 - i}
              register={this.handleRegister}
            ></MessageBox>
          ))}
        </div>
      </div>
    );
  }
}
