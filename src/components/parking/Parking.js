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

    decreaseNumOfFreeSlots(type, car){
        let state = this.state;
        if(type === CarTypes.DISABLED){
            if(state.disabled !== 0){
                state.disabled -=1;
                car.slot = CarTypes.DISABLED;
            } else {
                if(state.sedan !== 0){
                    state.sedan -=1;
                    car.slot = CarTypes.SEDAN;
                } else if(state.truck !== 0){
                    state.truck -=1;
                    car.slot = CarTypes.TRUCK;
                } else {
                    console.log("No free slots");
                }
            }
        } else if (type === CarTypes.TRUCK){
            if(state.truck !== 0 ){
                state.truck -=1;
                car.slot = CarTypes.TRUCK;
            } else {
                console.log("No free slots");
            }
        } else if(type === CarTypes.SEDAN){
            if(state.sedan !== 0){
                state.sedan -=1;
                car.slot = CarTypes.SEDAN;
            } else {
                if(state.truck !== 0 ){
                    state.truck -=1;
                    car.slot = CarTypes.TRUCK;
                } else {
                    console.log("No free slots");
                }
            }
        }
       this.setState({state});

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

        this.setState({cars});
        this.decreaseNumOfFreeSlots(type, car);

    }

    leaveCar(id){
        let state = this.state;
        for (let i = 0 ; i < state.cars.length; i++){
            if(state.cars[i].id  === id){
                state.cars.splice(i, 1);
                let type = state.cars[i].slot.toLowerCase();
                this.state[type] +=1;

            }
        }

        this.setState({state})

    }
    render(){

        return null;
    }
};
export default Parking;
