import React from "react";

import { PublishBox } from "./publishComment/PublishBox";
import { MessageBox } from "./showComment/MessageBox";

import { GetMessages, GetComments } from "../client";

export { MesBox };

interface MesBoxProps {}

interface MesBoxStates {
  comments: Array<any>;
  initialReplys: [][];
}

class MesBox extends React.Component<MesBoxProps, MesBoxStates> {
  publish: any;

  constructor(props: MesBoxProps) {
    super(props);

    this.state = {
      comments: [],
      initialReplys: []
    };

    this.handlePublish = this.handlePublish.bind(this);
    this.OnRef = this.OnRef.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  componentDidMount() {
    Promise.resolve(GetMessages())
      .then(async result => {
        let t = JSON.parse(result);
        this.setState({ comments: t.reverse() });
      })
      .then(async () => {
        Promise.resolve(GetComments()).then(r => {
          let t = JSON.parse(r);
          this.setState({ initialReplys: t.reverse() });
        });
      });
  }

  OnRef(ref: any) {
    this.publish = ref;
  }

  handlePublish(m: any) {
    m.index = this.state.comments.length;
    this.state.comments.unshift(m);
    this.state.initialReplys.unshift([]);
    this.setState({
      comments: this.state.comments,
      initialReplys: this.state.initialReplys
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
              initialReplys={this.state.initialReplys[i]}
            ></MessageBox>
          ))}
        </div>
      </div>
    );
  }
}
