import React from 'react';
import { render } from 'enzyme';
import Game from './game';

describe('Game component',()=>{
    it('renders without crashing', () => {
        render(<Game />);
    });
});

