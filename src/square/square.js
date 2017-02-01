import React, { Component } from 'react';

class Square extends Component {

    constructor(props) {
        super(props);
        this.onSquareClick = this.onSquareClick.bind(this);
    }

    onSquareClick() {
        this.props.onClick(this.props.index);
    }

    render() {
        return (
            <div className="square" id={this.props.index} onClick={this.onSquareClick}>
                <span>{this.props.value}</span>
            </div>
        )
    }
}

export default Square;