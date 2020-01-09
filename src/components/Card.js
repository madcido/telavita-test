import React, { useContext, useEffect } from 'react';
import Spinner from './Spinner';
import Dispatch from '../reducer';

export default function Card({ id, info }) {
    const dispatch = useContext(Dispatch);

    useEffect(() => {
        if (!info) {
            fetch(`https://kitsu.io/api/edge/media-characters/${id}/character`)
                .then(response => response.json())
                .then(json => dispatch({
                    type: 'NEW_CHAR_INFO',
                    charId: id,
                    payload: {
                        name: json.data.attributes.name,
                        otherNames: json.data.attributes.otherNames,
                        description: json.data.attributes.description,
                        image: json.data.attributes.image.original,
                    },
                }));
        }
    });

    return (
        <div className='card__container'>
        {info ?
            <div className='card'>
                <img src={info.image} alt='character image' />
                <div className='card__names'>
                    <h4>{info.name}</h4>
                    <ul>
                        <li>AKA:</li>
                        {(info.otherNames.length !== 0) ?
                            info.otherNames.map((name, index) => (
                                <li key={index}>{name}</li>
                            )) :
                            <li>-</li>
                        }
                    </ul>
                </div>
                {info.description ?
                    <div
                        className='card__description'
                        dangerouslySetInnerHTML={{ __html: info.description }}
                    /> :
                    <p>No description available</p>
                }
            </div> :
            <Spinner />
        }
        </div>
    );
}
