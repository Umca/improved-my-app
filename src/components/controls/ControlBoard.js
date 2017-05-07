import React from 'react';

function ControlBoard(props) {
    return (
        <div >
            <div className="form-group margin-bottom">
                <div>
                    <input type="radio" name="type" value="disabled" id="disabled" onChange={props.handleChange}
                           checked={props.isChecked === "disabled" }/>
                    <label htmlFor="disabled" className="radio-disabled"> Disabled</label>
                </div>
                <div>
                    <input type="radio" name="type" value="truck" id="truck" onChange={props.handleChange}
                           checked={props.isChecked === "truck" }/>
                    <label htmlFor="truck" className="radio-truck"> Truck</label>
                </div>
                <div>

                    <input type="radio" name="type" value="sedan" id="sedan" onChange={props.handleChange}
                           checked={props.isChecked === "sedan" }/>
                    <label htmlFor="sedan" className="radio-sedan"> Sedan</label>
                </div>
                <p className="details">* Choose what type of car do you want to add.</p>
                <button className="btn btn-success custom-width" onClick={props.handleAddBtn}>Add car</button>
            </div>
            <div className="form-group">
                <p className="details">* Click on the slot if you want to leave our parking</p>
                {/*<button className="btn btn-danger custom-width" onClick={props.handleRemoveBtn}>Remove car</button>*/}
            </div>
            <div className="form-group">
                <button className="btn btn-primary custom-width" onClick={props.handleStateBtn}>Get state</button>
            </div>
        </div>
    )
}

export default ControlBoard;