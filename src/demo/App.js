/* eslint no-magic-numbers: 0 */
import React, { useState } from 'react';

import { interactive_2d_graph } from '../lib';

const App = () => {

    const [state, setState] = useState({value:'', label:'Type Here'});
    const setProps = (newProps) => {
            setState(newProps);
        };

    return (
        <div>
            <interactive_2d_graph
                setProps={setProps}
                {...state}
            />
        </div>
    )
};


export default App;
