import Car from './Car';
import {CarTypes} from "../../data/CarTypes";

class Truck extends Car{
    constructor(){
        super();
        this.type=CarTypes.TRUCK;
    }

};

export default Truck;
