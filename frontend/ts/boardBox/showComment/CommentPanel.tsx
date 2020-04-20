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
  name:string;
}

class CommentPanel extends React.Component<
  CommentPanelProps,
  CommentPanelStates
> {
  constructor(props: CommentPanelProps) {
    super(props);
    this.state = {
      show: false,
      content: "",
      name:""
    };

    this.handlePanelDis = this.handlePanelDis.bind(this);
    this.preventDis = this.preventDis.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.updateName=this.updateName.bind(this);
  }

  componentDidMount() {
    this.props.OnRef(this);
  }

  handleReplySubmit() {
    let replyContent = this.state.content,
      blankReg = new RegExp("^\\s+$");
    if (
      replyContent !== "" &&
      blankReg.test(replyContent) === false &&
      this.props.onSubmit
    ) {
      this.handlePanelDis();
      this.setState({ content: "" });
      this.props.onSubmit(this.state.content);
    }
  }

  updateName(newName:string){
    this.setState({name: newName});
  }

  handlePanelDis() {
    this.setState({ show: false });
  }

  handlePanelShow() {
    this.setState({ show: true });
  }

  handleContentChange(e: any) {
    this.setState({ content: e.target.value });
  }

  preventDis(e: any) {
    e.stopPropagation();
  }

  render() {
    return (
      <div
        className={`comment-panel ${
          this.state.show === true ? "comment-panel-show" : "comment-panel-dis"
        }`}
        onClick={this.handlePanelDis}
      >
        <div className="reply-panel" onClick={e => this.preventDis(e)}>
          <button className="close" onClick={this.handlePanelDis}>
            <svg viewBox="0 0 24 24">
              <path
                fill="#cccccc"
                d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
              />
            </svg>
          </button>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "-20px"
            }}
          >
            <span className="reply-title">{this.state.name}</span>
          </div>

          <div className="comment-content-box">
            <textarea
              className="content comment-word"
              value={this.state.content}
              onChange={this.handleContentChange}
            ></textarea>
          </div>

          <button className="reply-send" onClick={this.handleReplySubmit}>
            <svg viewBox="0 0 24 24">
              <path fill="#e1e1e1" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
