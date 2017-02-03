import React from 'react';
import { render,shallow,mount } from 'enzyme';
import Board from './../board';

describe('Board component', ()=> {
    it('renders without crashing', () => {
        render(<Board />);
    });

    it('should have 9 squares', ()=> {
        let tree = mount(<Board/>);
        expect(tree.find('.square').length).toBe(9);
    });

    describe('Init state', ()=> {
        let tree;
        beforeAll(()=> {
            tree = shallow(<Board/>);
        });
        it('square array with 9 elements', ()=> {
            expect(tree.state().squares).toBeDefined();
            expect(tree.state().squares.filter((val)=>(val == null)).length).toBe(9);
        });

        it('isXNext should be true', ()=> {
            expect(tree.state().isXNext).toBe(true);
        });

        it('gameStatus should be undefined', ()=> {
            expect(tree.state().gameStatus).toBe(undefined);
        });
        it('direction should be undefined', ()=> {
            expect(tree.state().direction).toBe(undefined);
        });
    });

    describe('events',()=>{
        let tree;
        beforeAll(()=>{
            tree = mount(<Board/>);
        });

        it('squareClicked method update state.squares', ()=> {
            tree.find('.square').first().props().onClick(11);
            expect(tree.state().squares[11]).toBe('X');
        });

        it('squareClicked method set state.isXNext', ()=> {
            expect(tree.state().isXNext).toBe(false);
        });

        it('squareClicked method does not update state.squares if state.squares[index] already have value',()=>{
            tree.find('.square').first().props().onClick(11);
            expect(tree.state().squares[11]).toBe('X');
        });

        it('squareClicked method does not set state.isXNext if state.squares[index] already have value',()=>{
            tree.find('.square').first().props().onClick(11);
            expect(tree.state().isXNext).toBe(false);
        });

        it('setDragging set the state.draggingIndex',()=>{
            tree.node.setDragging(11);
            expect(tree.state().draggingIndex).toBe(11);
        });

        it('move method update state.squares',()=>{
            tree.node.squareClicked(12);
            tree.node.move(21);
            expect(tree.state().squares[11]).toBe(null);
            expect(tree.state().squares[21]).toBe('X');
        });

        it('move method set state.isXNext', ()=> {
            expect(tree.state().isXNext).toBe(false);
        });

        it('move method does not update state.squares if state.squares[index] already have value',()=>{
            tree.node.squareClicked(33);
            tree.setState({draggingIndex:21})
            tree.node.move(33);
            expect(tree.state().squares[21]).toBe('X');
            expect(tree.state().squares[33]).toBe('O');
        });

        it('move method does not set state.isXNext if state.squares[index] already have value',()=>{
            tree.setState({draggingIndex:21})
            tree.node.move(33);
            expect(tree.state().isXNext).toBe(true);
        });

        it('clearDragging clear the state.draggingIndex ',()=>{
            let tree = mount(<Board/>);
            tree.node.clearDragging();
            expect(tree.state().draggingIndex).toBe(null);
        });
    });

    describe('game status',()=>{
        it('X winner',()=>{
            let tree = mount(<Board/>);
            tree.node.squareClicked(11);
            tree.node.squareClicked(12);
            tree.node.squareClicked(21);
            tree.node.squareClicked(22);
            tree.node.squareClicked(31);
            expect(tree.state().gameStatus).toBe('X');
        });
        it('O winner',()=>{
            let tree = mount(<Board/>);
            tree.node.squareClicked(11);
            tree.node.squareClicked(12);
            tree.node.squareClicked(23);
            tree.node.squareClicked(22);
            tree.node.squareClicked(31);
            tree.node.squareClicked(32);
            expect(tree.state().gameStatus).toBe('O');
        });

        it('X winner diagonally',()=>{
            let tree = mount(<Board/>);
            tree.node.squareClicked(11);
            tree.node.squareClicked(12);
            tree.node.squareClicked(22);
            tree.node.squareClicked(21);
            tree.node.squareClicked(33);
            expect(tree.state().gameStatus).toBe('X');
        });
        it('X winner diagonally',()=>{
            let tree = mount(<Board/>);
            tree.node.squareClicked(13);
            tree.node.squareClicked(12);
            tree.node.squareClicked(22);
            tree.node.squareClicked(21);
            tree.node.squareClicked(31);
            expect(tree.state().gameStatus).toBe('X');
        });
        it('X winner horizontally',()=>{
            let tree = mount(<Board/>);
            tree.node.squareClicked(11);
            tree.node.squareClicked(21);
            tree.node.squareClicked(12);
            tree.node.squareClicked(22);
            tree.node.squareClicked(13);
            expect(tree.state().gameStatus).toBe('X');
        });
    });
});
