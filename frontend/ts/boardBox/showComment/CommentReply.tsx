import React from "react";

import "../../../css/reply.scss";

export { CommentReply };

interface ReplyBoxProps {
  reply: any;
  onSubmit: any;
}

class CommentReply extends React.Component<ReplyBoxProps> {
  constructor(props: ReplyBoxProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.props.reply.name);
    }
  }

  render() {
    return (
      <div
        className="comment-reply comment-content"
        onClick={this.handleSubmit}
      >
        <span className="reply-name">{this.props.reply.name}</span>
        <span style={{ color: "silver", fontWeight: 600 }}>
          {this.props.reply.replyName === "" ? "" : " reply "}
        </span>
        <span className="reply-name">
          {this.props.reply.replyName === "" ? "" : this.props.reply.replyName}
        </span>
        <span style={{ fontWeight: "bold", color: "#93b8c4" }}>:&nbsp;</span>
        <span className="reply-content">{this.props.reply.content}</span>
      </div>
    );
  }
}
