import React from "react";

import { SaveMessage} from "../../client";

export { PublishBox };

const gravatarUrl = require("gravatar-url");

const defaultPublishImage = "https://s1.ax1x.com/2020/07/29/aeJE6K.png";

const nameReg = new RegExp("[a-zA-Z]*[1-9]*[_]*"),
  emailReg = new RegExp(
    "^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$"
  ),
  spaceReg = new RegExp("\\s+");

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

class PublishBox extends React.Component<PublishBoxProps, PublishBoxStates> {
  image: HTMLImageElement;

  constructor(props: PublishBoxProps) {
    super(props);

    this.state = {
      name: "",
      email: "",
      content: "",
      nameHint: false,
      emailHint: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.judgeNameAndEmail = this.judgeNameAndEmail.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.judgeName = this.judgeName.bind(this);
  }

  componentDidMount() {
    this.props.OnRef(this);
    this.image = document.querySelector(
      ".publish-gravatar"
    ) as HTMLImageElement;
  }

  handleNameChange(e: any) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e: any) {
    this.setState({
      email: e.target.value,
    });
  }

  async handleOnBlur() {
    if (emailReg.test(this.state.email) === true) {
      let imageUrl = gravatarUrl(this.state.email, { size: 200 });

      imageUrl += "&d=" + defaultPublishImage;

      this.image.src = imageUrl;
    }
  }

  handleContentChange(e: any) {
    this.setState({ content: e.target.value });
  }

  judgeName() {
    let authorName = this.state.name;

    if (
      authorName === "" ||
      spaceReg.test(authorName) === true ||
      nameReg.test(authorName) === false
    ) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      this.setState({ nameHint: true });
      setTimeout(() => {
        this.setState({ nameHint: false });
      }, 1000);
      return false;
    }

    return authorName;
  }

  judgeNameAndEmail() {
    let authorEmail = this.state.email,
      authorContent = this.state.content;

    if (this.judgeName() === false) return false;

    if (emailReg.test(authorEmail) === false) {
      this.setState({ emailHint: true });
      setTimeout(() => {
        this.setState({ emailHint: false });
      }, 1000);
      return false;
    }

    let blankReg = new RegExp("^\\s+$");

    if (authorContent === "" || blankReg.test(authorContent) === true) {
      return false;
    }
    return true;
  }

  async handleSubmit() {
    if (this.props.onSubmit) {
      if (this.judgeNameAndEmail() === false) return;
      const { name, email, content } = this.state;
      const time = GetCurrentTime();

      let message = {
        name: name,
        email: email,
        time: time,
        content: content,
        comments: new Array(),
        id: 0
      };

      Promise.resolve(SaveMessage(JSON.stringify(message))).then(v=>{
        message.id = v;
        this.props.onSubmit(message);
      })

    };

    this.setState({ content: " " });
  }

  render() {
    return (
      <div className="publish-box">
        <div className="publish">
          <div className="author">
            <div className="author-avater">
              <img className="publish-gravatar"></img>
            </div>

            <div className="author-info">
              <div
                className={`author-name ${
                  this.state.nameHint === true ? "after-show" : null
                }`}
              >
                <input
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  className="name-input"
                  maxLength={12}
                  placeholder="name"
                ></input>
              </div>

              <div
                className={`author-email ${
                  this.state.emailHint === true ? "after-show" : null
                }`}
              >
                <input
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  className="email-input"
                  maxLength={255}
                  placeholder="email(optional)"
                  onBlur={this.handleOnBlur}
                ></input>
              </div>
            </div>
          </div>

          <div className="author-content ">
            <textarea
              className="content"
              placeholder="Just write something here……(。・∀・)ノ"
              onChange={this.handleContentChange}
              value={this.state.content}
            ></textarea>
          </div>
          <div className="publish-button-box">
            <button onClick={this.handleSubmit} className="publish-button">
              <svg viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M8,7.71V11.05L15.14,12L8,12.95V16.29L18,12L8,7.71Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function justifyNum(num: number) {
  return num < 10 ? "0" + num : num;
}

function GetCurrentTime() {
  let date = new Date();
  let year = date.getFullYear(),
    month = justifyNum(date.getMonth() + 1),
    day = justifyNum(date.getDate()),
    hour = justifyNum(date.getHours()),
    minute = justifyNum(date.getMinutes()),
    seconds = justifyNum(date.getSeconds());
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
  );
}
