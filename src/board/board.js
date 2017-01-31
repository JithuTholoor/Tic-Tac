import React, { Component } from 'react';
import Square from './../square/square';

class Board extends Component {

    getSqaures() {
        let sqaures = [];
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                sqaures[i+j.toString()]=null;
            }
        }
        return sqaures;
    }

    render() {
        return (
            <div className="board">
                {this.getSqaures().map((squareVal,index)=>{
                    return <Square key={index} index={index}/>
                })}
            </div>
        )
    }
}

export default Board;