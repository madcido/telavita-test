import React, { useReducer, useEffect } from 'react';
import Spinner from './Spinner';
import Slider from './Slider';
import { Dispatch, reducer } from '../reducer';

export default function App() {
    const [state, dispatch] = useReducer(reducer, {});

    useEffect(() => {
        if (!state.list) {
            const characterList =[];
            fetch(`https://kitsu.io/api/edge/anime/720/characters?page[limit]=20`)
                .then(response => response.json())
                .then(json => {
                    json.data.map(el => characterList.push({ id: el.id }));
                    dispatch({
                        type: 'NEW_LIST',
                        payload: characterList,
                    });
                });
        }
    });

    return (
        <Dispatch.Provider value={dispatch}>
        {state.list ?
            <Slider data={state.list} /> :
            <Spinner />
        }
        </Dispatch.Provider>
    );
}
