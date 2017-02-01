import React, { Component } from 'react';
import Square from './../square/square';

class Board extends Component {

    constructor(props) {
        super(props);
        let squares = [];
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                if (!squares[i + j.toString()])
                    squares[i + j.toString()] = null;
            }
        }
        this.state = { squares, isXNext: true };
        this.squareClicked = this.squareClicked.bind(this);
    }

    squareClicked(index) {
        let squares = this.state.squares.slice();
        if (!squares[index] &&(( this.state.isXNext &&  squares.filter((ele) => (ele === 'X')).length < 3) || (! this.state.isXNext &&  squares.filter((ele) => (ele === 'O')).length < 3))) {
            squares[index] = this.state.isXNext ? 'X' : 'O';
            this.setState({ squares: squares, isXNext: !this.state.isXNext });
        }
    }

    render() {
        return (
            <div className="board">
                {this.state.squares.map((squareVal, index) => {
                    return <Square onClick={this.squareClicked} key={index} index={index} value={squareVal} />
                })}
            </div>
        )
    }
}

export default Board;