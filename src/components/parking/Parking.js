import React from 'react';
import {CarTypes} from '../../data/CarTypes';
import Sedan from '../cars/Sedan';
import Disabled from '../cars/Disabled';
import Truck from '../cars/Truck';
import CarFactory from '../../models/CarFactory';

class Parking extends React.Component{
    constructor(){
        super();
        this.state = {
            slots: 30,
            cars:[],
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
    addCar(type){
        let cars = this.state.cars;

        const factory = new CarFactory();
        let car = factory.createCar(type);
        cars.push(car);
        //this.setState({cars});
        console.log(cars);

    }
    render(){
        {this.addCar(CarTypes.SEDAN)}
        {this.addCar(CarTypes.SEDAN)}
        {this.addCar(CarTypes.SEDAN)}
        {console.log(this.getParkingState())}
        return(
            <div className="parking">

            </div>
        )
    }
};
export default Parking;
