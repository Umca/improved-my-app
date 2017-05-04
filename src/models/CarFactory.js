import {CarTypes} from '../data/CarTypes';
import Sedan from '../components/cars/Sedan';
import Truck from '../components/cars/Truck';
import Disabled from '../components/cars/Disabled';

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

        return car;
    }
}
export default Factory;