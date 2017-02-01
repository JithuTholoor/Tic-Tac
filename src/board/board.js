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
    }

    squareClicked(index) {
        let squares = this.state.squares.slice();
        if (!squares[index] && !this.state.gameStatus && (( this.state.isXNext && squares.filter((ele) => (ele === 'X')).length < 3) || (!this.state.isXNext && squares.filter((ele) => (ele === 'O')).length < 3))) {
            squares[index] = this.state.isXNext ? 'X' : 'O';
            this.setState({squares: squares, isXNext: !this.state.isXNext},()=>{
                let status = this.checkStatusOfGame();
                if (status)
                    this.setState({gameStatus: status});
            });
        }

    }

    checkConnection(Char, index,increment) {
        let squares = this.state.squares.slice();
        if(increment){
            if (squares[index + increment] === Char)
                return index + increment;
        }
        else {
            let varaible=[10,1,11,9];
            for(let i in varaible){
                if (squares[index + varaible[i]] === Char)
                    return index + varaible[i];
            }
        }
    }

    checkStatusOfGame() {
        let squares = this.state.squares.slice();
        let indexOfFirstX = squares.indexOf('X');
        let connectedSquareIndex = this.checkConnection('X', indexOfFirstX);
        if (connectedSquareIndex) {

            if (this.checkConnection('X', connectedSquareIndex,connectedSquareIndex-indexOfFirstX))
                return 'X';
        }
        let indexOfFirstO = squares.indexOf('O');
        connectedSquareIndex = this.checkConnection('O', indexOfFirstO);
        if (connectedSquareIndex) {
            if (this.checkConnection('O', connectedSquareIndex,connectedSquareIndex-indexOfFirstO))
                return 'O';
        }
        return;
    }

    render() {
        return (
            <div>
                {this.state.gameStatus?this.state.gameStatus+' wins':(this.state.isXNext?'X':'O')+' play'}
                <div className="board">
                    {this.state.squares.map((squareVal, index) => {
                        return <Square onClick={this.squareClicked} key={index} index={index} value={squareVal}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Board;
