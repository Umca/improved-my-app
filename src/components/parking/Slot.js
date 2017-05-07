import React from 'react';

function Slot(props){
    return(
        <div className={`${props.type} slot ${props.free ? '' : 'occupied'}`} id={props.id}>
            <span className="slot-id">{props.id}</span>
        </div>
    )
}

export default Slot;
