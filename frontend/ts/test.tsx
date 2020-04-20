import "../css/UI.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";

interface BoardProps {
  squares: Array<string>;
  onclick: any;
}

interface SquareProps {
  value: string;
  onclick: any;
}

interface GameProps {}

interface GameStates {
  history: string[][];
  xIsNext: boolean;
  stepNumber: number;
}

function Square({ value, onclick }: SquareProps) {
  return (
    <button className="square" onClick={onclick}>
      {value}
    </button>
  );
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onclick={() => this.props.onclick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component<GameProps, GameStates> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    let squares = history[history.length - 1].slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    history.push(squares);
    this.setState({
      history: history,
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length - 1
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current);

    const moves = history.map((obj, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    if (winner) status = "winner is" + winner;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current}
            onclick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

// ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares: Array<string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
