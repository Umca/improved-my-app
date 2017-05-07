import React from 'react';

function Statistics(props){
    return(
        <div className="statistics details">
            <p>Total number of free slots: {props.totalFree}</p>
            <p>Total number of occupied slots: {props.totalOccupied}</p>
            <hr/>
            {Object.keys(props.data).map((item)=>{
                return <p>{item[0].toUpperCase() + item.slice(1)} : {props.data[item]}</p>
            })}
        </div>
    )
};

export default Statistics;
