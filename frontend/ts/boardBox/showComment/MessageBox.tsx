import React from "react";

import "../../../css/message.scss";

import { CommentReply } from "./CommentReply";
import { CommentPanel } from "./CommentPanel";

import {SaveComment} from "../../client"

export { MessageBox };

const gravatarUrl = require("gravatar-url");

const defauldCommentImage = "https://i.loli.net/2020/04/30/LglI7DCyEH28bZz.png";

interface MessageBoxProps {
  comment: any;
  onSubmit: any;
  initialReplys: [];
}

interface MessageBoxStates {
  replys: Array<any>;
}

class MessageBox extends React.Component<MessageBoxProps, MessageBoxStates> {
  child: any;
  currentName: string = "";
  currentReplyName: string = "";

  constructor(props: MessageBoxProps) {
    super(props);

    this.state = {
      replys: []
    };

    this.OnRef = this.OnRef.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentPanelShow = this.handleCommentPanelShow.bind(this);
    this.handleReplyPanelShow = this.handleReplyPanelShow.bind(this);
    this.handlePanelShow = this.handlePanelShow.bind(this);
  }

  componentDidMount() {
    let id = setInterval(()=>{
      if (this.props.initialReplys !== undefined){
        this.setState({ replys: this.props.initialReplys });
        clearInterval(id);
      }
    }, 10);
  }

  handlePanelShow(n: string, c: boolean) {
    let name = this.props.onSubmit();
    if (name !== false) {
      this.currentName = name;
      this.child.updateName(`${c === true ? "Comment" : "Reply"} to ${n}`);
      this.child.handlePanelShow();
    }
  }

  handleCommentSubmit(c: any) {
    if (this.currentName !== "") {
      let newReply = {
        name: this.currentName,
        content: c,
        replyName: this.currentReplyName,
        index: this.props.comment.index
      };
      this.state.replys.push(newReply);
      this.setState({ replys: this.state.replys });
      SaveComment(JSON.stringify(newReply));
    }
  }

  handleCommentPanelShow() {
    this.currentReplyName = "";
    this.handlePanelShow(this.props.comment.name, true);
  }

  handleReplyPanelShow(m: any) {
    this.currentReplyName = m;
    this.handlePanelShow(m, false);
  }

  OnRef(ref: any) {
    this.child = ref;
  }

  render() {
    return (
      <div className="publish-box message-box">
        <CommentPanel
          OnRef={this.OnRef}
          onSubmit={this.handleCommentSubmit}
        ></CommentPanel>
        <div className="publish message-show">
          <div className="author">
            <div className="author-avater">
              <img src={GetEmailAvatar(this.props.comment.email)}></img>
            </div>

            <div className="name">{this.props.comment.name}</div>

            <div className="author-info message-info">
              <div className="author-name">
                <input
                  className="name-input"
                  maxLength={12}
                  placeholder="name"
                ></input>
              </div>

              <div className="author-email">
                <input
                  className="email-input"
                  maxLength={256}
                  placeholder="email(optional)"
                ></input>
              </div>
            </div>
          </div>

          <div className="author-content comment">
            <p className="comment-content">{this.props.comment.content}</p>
          </div>

          <div className="publish-button-box end">
            <span className="time">{this.props.comment.time}</span>
            <button
              className="publish-button reply"
              onClick={this.handleCommentPanelShow}
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18,8H6V6H18V8M18,11H6V9H18V11M18,14H6V12H18V14M22,4A2,2 0 0,0 20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H18L22,22V4Z"
                />
              </svg>
            </button>
          </div>

          <div
            className="reply-box"
            style={{
              marginBottom: this.state.replys.length > 0 ? "30px" : "0"
            }}
          >
            {this.state.replys.map((reply, i) => (
              <CommentReply
                onSubmit={this.handleReplyPanelShow}
                reply={reply}
                key={i}
              ></CommentReply>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function GetEmailAvatar(email: string) {
  let imageUrl = gravatarUrl(email, { size: 200 });

  imageUrl += "&d=" + defauldCommentImage;

  return imageUrl;
}
