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
        this.state = {squares, isXNext: true};
        this.squareClicked = this.squareClicked.bind(this);
        this.checkStatusOfGame = this.checkStatusOfGame.bind(this);
        this.checkConnection = this.checkConnection.bind(this);
        this.clearDragging = this.clearDragging.bind(this);
        this.setDragging = this.setDragging.bind(this);
        this.move = this.move.bind(this);
        this.isDroppable = this.isDroppable.bind(this);
    }

    squareClicked(index) {
        let squares = this.state.squares.slice();
        if (!squares[index] && !this.state.gameStatus && (( this.state.isXNext && squares.filter((ele) => (ele === 'X')).length < 3) || (!this.state.isXNext && squares.filter((ele) => (ele === 'O')).length < 3))) {
            squares[index] = this.state.isXNext ? 'X' : 'O';
            let obj = this.checkStatusOfGame(squares);
            this.setState({
                squares: squares,
                isXNext: !this.state.isXNext,
                gameStatus: obj.status,
                direction: obj.direction
            });
        }
    }

    checkConnection(squares, Char, index, increment) {
        if (increment) {
            if (squares[index + increment] === Char)
                return index + increment;
        }
        else {
            let variable = [10, 1, 11, 9];
            for (let i in variable) {
                if (squares[index + variable[i]] === Char)
                    return index + variable[i];
            }
        }
    }

    checkStatusOfGame(squares) {
        let indexOfFirstX = squares.indexOf('X');
        let connectedSquareIndex = this.checkConnection(squares, 'X', indexOfFirstX);
        if (connectedSquareIndex) {
            let secondConnectionIndex = this.checkConnection(squares, 'X', connectedSquareIndex, connectedSquareIndex - indexOfFirstX)
            if (secondConnectionIndex) {
                return {direction: this.getDirection(connectedSquareIndex,secondConnectionIndex),status:'X'};
            }
        }
        let indexOfFirstO = squares.indexOf('O');
        connectedSquareIndex = this.checkConnection(squares, 'O', indexOfFirstO);
        if (connectedSquareIndex) {
            let secondConnectionIndex = this.checkConnection(squares, 'O', connectedSquareIndex, connectedSquareIndex - indexOfFirstO)
            if (secondConnectionIndex) {
                return {direction: this.getDirection(connectedSquareIndex,secondConnectionIndex),status:'O'};
            }
        }
        return {};
    }

    getDirection(connectedSquareIndex,secondConnectionIndex){
        let direction;
        switch (Math.abs(connectedSquareIndex - secondConnectionIndex)) {
            case 1:
                direction = 'left-right';
                break;
            case 10:
                direction = 'top-bottom'
                break;
            case 9:
                direction = 'leftBottom-rightTop'
                break;
            case 11:
                direction = 'leftTop-rightBottom'
                break;
        }
        return direction;
    }

    clearDragging() {
        this.setState({draggingIndex: null});
    }

    setDragging(index) {
        this.setState({draggingIndex: index});
    }

    move(index) {
        const squares = this.state.squares.slice();
        if (this.state.draggingIndex !== index && !this.state.squares[index]) {
            squares[this.state.draggingIndex] = null;
            squares[index] = this.state.squares[this.state.draggingIndex];
            let obj = this.checkStatusOfGame(squares);
            this.setState({
                squares: squares,
                isXNext: !this.state.isXNext,
                gameStatus: obj.status,
                direction: obj.direction
            });
        }
        this.clearDragging();
    }

    isDroppable(value, index) {
        if (this.state.draggingIndex && !value) {
            let diff = Math.abs(this.state.draggingIndex - index);
            if (diff === 1 || diff === 10 || diff === 11 || diff === 9)
                return true;
        }
    }

    render() {
        return (
            <div className="board">
                <h5>{this.state.gameStatus ? this.state.gameStatus + ' wins' : (this.state.isXNext ? 'X' : 'O') + ' play'}</h5>
                <div>
                    {this.state.squares.map((squareVal, index) => {
                        return (<
                                Square key={index} index={index}
                                       value={squareVal}
                                       onClick={this.squareClicked}
                                       clearDragging={this.clearDragging}
                                       setDragging={this.setDragging}
                                       move={this.move}
                                       direction={this.state.gameStatus===squareVal? this.state.direction:null}
                                       isDroppable={this.isDroppable(squareVal,index)}
                                       isDraggable={(squareVal!=null?(this.state.isXNext?squareVal==='X':squareVal==='O'):false) && this.state.gameStatus==null}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Board;
