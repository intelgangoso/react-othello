import React from 'react';

export default function Tile(props) {
    return (
        <button className='column tile' onClick={() => props.onClick()}>
            <div className={props.value}></div>
        </button>
    );
}