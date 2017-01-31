import React, { Component } from 'react';

class Square extends Component {
    render() {
        return (
            <div className="square" id={this.props.index}>
                <span>X</span>                             
            </div>
        )
    }
}

export default Square;