import React from 'react';
import CarFactory from '../../models/CarFactory';
import Slot from './Slot';
import _ from 'lodash';
import ControlBoard from '../controls/ControlBoard';
import Statistics from '../controls/Statistics';

class Parking extends React.Component{

    constructor() {
        super();
        this.state = {
            slots: [],
            isChecked:'',
            cars:[],
            showStatistics:false
        };
        this.id = -1;
        this.numOfSlots = Math.round(Math.random()*(80-20+1)+20);
        this.generalData = [
            {disabled: 15 * this.numOfSlots / 100},
            {truck: 35 * this.numOfSlots / 100},
            {sedan: 50 * this.numOfSlots / 100}
        ]
    }

    countNumOfParticularSlots(){
        let slots = this.state.slots;
        let occupied = slots.filter((slot) => !slot.free);
        let data={};
        for(let i = 0; i < this.generalData.length; i++){
            let arr = occupied.filter((slot)=>{
                return slot.type === Object.keys(this.generalData[i])[0]
            });
            data[Object.keys(this.generalData[i])[0]+'_Occupied'] = arr.length;
            data[Object.keys(this.generalData[i])[0]+'_Free'] = Object.values(this.generalData[i])[0] - arr.length <=0 ? 0 : Math.ceil(Object.values(this.generalData[i])[0] - arr.length);
        }
        return data;
    }
    initSlot(type){
        return {
            type: type,
            free: true,
            car: null
        }
    }
    fillWithSlots(type, num){
        let slots = [];
        for(let i = 0; i < num ; i++){
            slots.push(this.initSlot(type));
        }
        return slots;
    }
    componentWillMount(){
        let slots = _.flatten(this.generalData.map((obj)=>{
            return this.fillWithSlots(Object.keys(obj)[0], Object.values(obj)[0]);

        }));

        for (let i = 0; i < slots.length; i++){
            slots[i].id = i;
        }
        this.setState({slots});
    }
    removeFromCars(id){
        let cars = this.state.cars.filter((car)=>{
            return car.id !== +id;
        });
        this.setState({cars});

    }
    removeFromSlots(id){
        let slots = this.state.slots;
        for(let i = 0; i < slots.length; i++){
            if(slots[i].id === +id){
                slots[i].free = true;
            }
        }
        this.setState({slots});
    }
    leaveParking(e){
        let id = e.target.id;
        this.removeFromCars(id);
        this.removeFromSlots(id);
    }
    handleChange(e){
        this.setState({
            isChecked: e.target.value
        })
    }

    createCar(type){
        const factory = new CarFactory();
        let car = factory.createCar(type);
        return car;
    }
    addCar(type){
        let cars = this.state.cars;
        let car = this.createCar(type);
        this.findFreeSlot(car);
        car.id = this.id;
        cars.push(car);
    }
    findFreeSlot(car){
        let freeSlots = this.state.slots.filter((slot)=>{
            return slot.free;
        });
        if(freeSlots !== 0){
            let temp = false;
            for(let j = 0; j < car.posSlot.length; j++){
                for(let i = 0; i < freeSlots.length; i++ ){
                    if(freeSlots[i].type === car.posSlot[j]){
                        freeSlots[i].free = false;
                        freeSlots[i].car = car.type;
                        this.id = freeSlots[i].id;
                        temp = true;
                        break;
                    }
                }
                if(temp){
                    break;
                }

            }

            this.forceUpdate();
        } else {
            alert('Unfortunately, our parking is full!')
        }
    }
    handleAddBtn(){
        this.addCar(this.state.isChecked);
    }
    getFreeSlots(){
        return this.state.slots.filter((slot) => slot.free).length;
    }
    getOccupiedSlots(){
        return this.state.slots.filter((slot) => !slot.free).length;
    }
    handleStateBtn(){
        this.setState({showStatistics : !this.state.showStatistics})
    }
    render(){
        return(
            <div className="container">
                <h1 className="text-center par">PARKING</h1>
                <div className="row">
                    <div className="col-md-9">
                        <div className="wrapper" onClick={this.leaveParking.bind(this)}>
                            {this.state.slots.map((slot, index)=>{
                                return <Slot type={slot.type} free={slot.free} id={index}

                                />
                            })}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <ControlBoard handleChange={this.handleChange.bind(this)}
                                      isChecked={this.state.isChecked}
                                      handleAddBtn={this.handleAddBtn.bind(this)}
                                      handleStateBtn={this.handleStateBtn.bind(this)}/>
                        {this.state.showStatistics ?
                            <Statistics data={this.countNumOfParticularSlots()} totalFree={this.getFreeSlots()} totalOccupied={this.getOccupiedSlots()}/>
                            :
                            null
                        }

                    </div>
                </div>

            </div>
        );
    }
};
export default Parking;
