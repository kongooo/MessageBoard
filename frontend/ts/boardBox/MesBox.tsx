import React from "react";

import { PublishBox } from "./publishComment/PublishBox";
import { MessageBox } from "./showComment/MessageBox";

export { MesBox };

interface MesBoxProps {}

interface MesBoxStates {
  comments: Array<any>;
}

class MesBox extends React.Component<MesBoxProps, MesBoxStates> {
  publish: any;

  constructor(props: MesBoxProps) {
    super(props);

    this.state = {
      comments: []
    };

    this.handlePublish = this.handlePublish.bind(this);
    this.OnRef = this.OnRef.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  OnRef(ref: any) {
    this.publish = ref;
  }

  handlePublish(m: any) {
    this.state.comments.push(m);
    this.setState({
      comments: this.state.comments
    });
  }

  handleComment() {
    return this.publish.judgeName();
  }

  render() {
    const temp = {
      name: "DipeprPansy",
      email: "1184701824@qq.com",
      content: "CXY dsb!",
      time: "2020-04-17 11:17:25"
    };

    return (
      <div className="mes-box">
        <PublishBox OnRef={this.OnRef} onSubmit={this.handlePublish} />
        <div>
          <MessageBox onSubmit={this.handleComment} comment={temp}></MessageBox>
          {this.state.comments.reverse().map((comment, i) => (
            <MessageBox
              onSubmit={this.handleComment}
              comment={comment}
              key={i}
            ></MessageBox>
          ))}
        </div>
      </div>
    );
  }
}
