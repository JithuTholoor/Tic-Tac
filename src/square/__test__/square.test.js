import React from 'react';
import { render,shallow } from 'enzyme';
import Square from './../square';

describe('Square component', ()=> {

    it('renders without crashing', () => {
        render(<Square />);
    });

    it('value property become child', () => {
        let tree = shallow(<Square value="X"/>);
        expect(tree.find('span').text()).toBe('X');
    });

    it('onClick triggers on click of square', () => {
        let mockFn = jest.fn();
        let tree = shallow(<Square onClick={mockFn}/>);
        tree.simulate('click')
        expect(mockFn).toBeCalled();
    });

    describe('Drag and drop', ()=> {
        let mockDragFn;
        let mockMoveFn;
        let mockClearDragging;
        let tree;
        beforeAll(()=> {
            mockDragFn = jest.fn();
            mockMoveFn = jest.fn();
            mockClearDragging = jest.fn();
            tree = shallow(<Square setDragging={mockDragFn}
                                   move={mockMoveFn}
                                   clearDragging={mockClearDragging}
            />);
        });

        it('draggable prop of span inside square be equal to isDraggable prop of square', ()=> {
            tree.setProps({isDraggable: false});
            expect(tree.find('span').props().draggable).toBe(false);
            tree.setProps({isDraggable: true});
            expect(tree.find('span').props().draggable).toBe(true);
        });

        it('setDragging triggers on drag of span element in square component', ()=> {
            tree.find('span').simulate('drag');
            expect(mockDragFn).toBeCalled();
        });

        it('dragOver prevent default',()=>{
            let event={};
            event.preventDefault=jest.fn();
            tree.simulate('dragOver',event);
            expect(event.preventDefault).toBeCalled();
        });

        it('can be droped only if isDroppable property is true', ()=> {
            tree.setProps({isDroppable: false});
            tree.simulate('drop');
            expect(mockMoveFn).not.toBeCalled();
        });

        it('move triggers on drop over square', ()=> {
            tree.setProps({isDroppable: true});
            tree.simulate('drop');
            expect(mockMoveFn).toBeCalled();
        });

        it('clearDragging triggers on drop', ()=> {
            tree.simulate('dragEnd');
            expect(mockClearDragging).toBeCalled();
        });

    });

    describe('strike through', ()=> {
        it('strike top to bottom', () => {
            let tree = shallow(<Square direction="top-bottom"/>);
            expect(tree.find('svg line').props()).toEqual({"x1": "50%", "x2": "50%", "y1": "0", "y2": "100%"})
        });
        it('strike left to right', () => {
            let tree = shallow(<Square direction="left-right"/>);
            expect(tree.find('svg line').props()).toEqual({"x1": "0", "x2": "100%", "y1": "50%", "y2": "50%"})
        });
        it('strike left-top to right-bottom', () => {
            let tree = shallow(<Square direction="leftTop-rightBottom"/>);
            expect(tree.find('svg line').props()).toEqual({"x1": "0", "x2": "100%", "y1": "0", "y2": "100%"})
        });
        it('strike left-bottom to right-top', () => {
            let tree = shallow(<Square direction="leftBottom-rightTop"/>);
            expect(tree.find('svg line').props()).toEqual({"x1": "0", "x2": "100%", "y1": "100%", "y2": "0"})
        });
    });
});

