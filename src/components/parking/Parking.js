import React from 'react';
import {CarTypes} from '../../data/CarTypes';

class Parking extends React.Component{
    constructor(){
        super();
        this.state = {
            slots: 30,
            cars:[{type: CarTypes.SEDAN}, {type: CarTypes.SEDAN}, {type: CarTypes.TRUCK}],
            disabled: 5,
            truck: 15,
            sedan:10
        }
    }

    getNumOfFreeSlots(){
        return this.state.slots - this.state.cars.length;
    }

    getNumOfAllBusySlots(){
        return this.state.cars.length;
    }

    getNumOfParticularCars(type){
        let cars = this.state.cars.filter((car)=>{
            return car.type === type;
        })

        return cars.length;
    }
    getNumOfFreeParticularSlots(type){
        let cars = this.getNumOfParticularCars(type);
        return this.state[type.toLowerCase()] - cars;
    }

    getParkingState(){
        let status = {};
        status.busyBySedan = this.getNumOfParticularCars(CarTypes.SEDAN);
        status.busyByTruck = this.getNumOfParticularCars(CarTypes.TRUCK);
        status.busyByDisabled = this.getNumOfParticularCars(CarTypes.DISABLED);
        status.freeSedanSlots = this.getNumOfFreeParticularSlots(CarTypes.SEDAN);
        status.freeTruckSlots = this.getNumOfFreeParticularSlots(CarTypes.TRUCK);
        status.freeDisabledSlots = this.getNumOfFreeParticularSlots(CarTypes.DISABLED);

        return status;
    }
    render(){
        return(
            <div className="parking">

            </div>
        )
    }
};
export default Parking;
