import React, { Component } from 'react';

class Square extends Component {

    constructor(props) {
        super(props);
        this.onSquareClick = this.onSquareClick.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onSquareClick() {
        this.props.onClick(this.props.index);
    }

    onDrop(e) {
        if (this.isDropable())
            this.props.move(this.props.index);
    }

    onDrag(e) {
        this.props.setDragging(this.props.index)
    }

    onDragOver(e) {
        e.preventDefault();
    }

    isDropable() {
        if (this.props.draggingSquareIndex && !this.props.value) {
            let diff = Math.abs(this.props.draggingSquareIndex - this.props.index);
            if (diff === 1 || diff === 10 || diff === 11 || diff === 9)
                return true;
        }
    }

    onDragEnd(e) {
        this.props.clearDragging(this.props.index)
    }

    getLine(direction) {
        switch (direction) {
            case 'top-bottom':
                return <line x1="50%" y1="0" x2="50%" y2="100%" style={{stroke:'#333','stroke-width':'2'}}/>
            case 'left-right':
                return <line x1="0" y1="50%" x2="100%" y2="50%" style={{stroke:'#333','stroke-width':'2'}}/>
            case 'leftTop-rightBottom':
                return <line x1="0" y1="0" x2="100%" y2="100%" style={{stroke:'#333','stroke-width':'2'}}/>
            case 'leftBottom-rightTop':
                return <line x1="" y1="100%" x2="100%" y2="0" style={{stroke:'#333','stroke-width':'2'}}/>
            default:
                return;
        }
    }

    getStrike() {
        if (this.props.value == this.props.gameStatus)
            return (
                <svg height="100%" width="100%">
                    {this.getLine(this.props.direction)}
                </svg>
            )
    }

    render() {
        return (
            <div className={this.isDropable() ? 'square active' : 'square non-active'}
                 onDragOver={this.onDragOver} onDrop={this.onDrop}
                 id={this.props.index} onClick={this.onSquareClick} onDragEnd={this.onDragEnd}>
                {this.getStrike()}
                <span draggable={this.props.isDraggable} onDrag={this.onDrag}>{this.props.value}</span>
            </div>
        )
    }
}

export default Square;
