import React, { Component } from 'react';
import Board from './../board/board';

class Game extends Component {
  render() {
    return (
      <section className="game">        
        <Board/>
      </section>
    );
  }
}

export default Game;
