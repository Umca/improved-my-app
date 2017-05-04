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
            sedan: 10
        }
        this.id = 0;
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

    decreaseNumOfFreeSlots(type){
        let state = this.state;
        if(type === CarTypes.DISABLED){
            if(state.disabled !== 0){
                state.disabled -=1;
            } else {
                if(state.sedan !== 0){
                    state.sedan -=1;
                } else if(state.truck !== 0){
                    state.truck -=1;
                } else {
                    console.log("No free slots");
                }
            }
        } else if (type === CarTypes.TRUCK){
            if(state.truck !== 0 ){
                state.truck -=1;
            } else {
                console.log("No free slots");
            }
        } else if(type === CarTypes.SEDAN){
            if(state.sedan !== 0){
                state.sedan -=1;
            } else {
                if(state.truck !== 0 ){
                    state.truck -=1;
                } else {
                    console.log("No free slots");
                }
            }
        }
       // this.setState({state});

    }
    addCar(type){

        let cars = this.state.cars;

        if(cars.length === this.state.slots){
            console.log('This parking is full! :(');
        }

        const factory = new CarFactory();
        let car = factory.createCar(type);
        this.id +=1;
        car.id = this.id;
        cars.push(car);

        //this.setState({cars});
        this.decreaseNumOfFreeSlots(type);

    }

    leaveCar(id){
        for (let i = 0 ; i < this.state.cars.length; i++){
            console.log(this.state.cars[i].id)
        }
    }
    render(){
        {this.addCar(CarTypes.SEDAN)}
        {this.addCar(CarTypes.DISABLED)}
        {this.addCar(CarTypes.DISABLED)}
        {this.addCar(CarTypes.DISABLED)}
        {this.addCar(CarTypes.DISABLED)}
        {this.addCar(CarTypes.DISABLED)}
        {this.addCar(CarTypes.DISABLED)}
        {this.leaveCar(3)}
        {console.log(2, this.state)}

        return null;
    }
};
export default Parking;
