import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function Slider({ data }) {
    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState(1);
    const dataToDisplay = (() => {
          const toDisplay = [];
          let i = index;
          while (toDisplay.length < Math.min(data.length, display)) {
                toDisplay.push(data[i]);
                i += 1;
                if (i > data.length - 1) {
                    i = 0;
                }
          }
          return toDisplay;
    })();

    function slide(direction) {
        const toIndex = (data.length + index + direction)%data.length;
        setIndex(toIndex);
    };

    function displayBySize() {
        if (window.innerWidth < 640) {
            setDisplay(1);
        } else if (window.innerWidth < 960) {
            setDisplay(2);
        } else if (window.innerWidth < 1280) {
            setDisplay(3);
        } else {
            setDisplay(4);
        }
    };

    useEffect(() => {
        displayBySize();
        window.addEventListener('resize', displayBySize);
        return () => window.removeEventListener('resize', displayBySize);
    });

    return (
        <div className='slider'>
            <i className='fas fa-arrow-left slider__prev-btn' onClick={() => slide(-1)} />
            <i className='fas fa-arrow-right slider__next-btn' onClick={() => slide(1)} />
            <div className='slider__display'>
            {dataToDisplay.map(el => (
                <Card key={el.id} {...el} />
            ))}
            </div>
        </div>
    );
}
