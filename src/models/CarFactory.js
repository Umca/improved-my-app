import CarTypes from '../data/CarTypes';


class Factory {
    createCar(type){
        let car;

        if(type === CarTypes.SEDAN){
            car = new Sedan();
        } else if (type === CarTypes.TRUCK){
            car = new Truck();
        } else if(type === CarTypes.DISABLED){
            car = new Disabled();
        }

        car.type  = type;

        return car;
    }
}
export default Factory;