import React, { Component } from 'react';
import Parking from './components/parking/Parking';

class App extends Component {

    //componentDidMount() {
    //   this._child.addCar(CarTypes.SEDAN);
    //    this._child.addCar(CarTypes.SEDAN);
    //    this._child.addCar(CarTypes.TRUCK);
    //    this._child.addCar(CarTypes.DISABLED);
    //    this._child.addCar(CarTypes.DISABLED);
    //    this._child.leaveCar(4);
    //    console.log(this._child.getParkingState());
    //    console.log(this._child.state);
    //}

    render() {
        return (
            <div className="App">
                <Parking ref={(child) => { this._child = child; }}/>
            </div>
        );
    }
}

export default App;
