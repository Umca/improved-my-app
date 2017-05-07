import Car from './Car';
import {CarTypes} from "../../data/CarTypes";

class Sedan extends Car{
    constructor(){
        super();
        this.type = CarTypes.SEDAN;
        this.posSlot = [CarTypes.SEDAN, CarTypes.TRUCK]
    }
};

export default Sedan;
