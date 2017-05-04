import Car from './Car';
import {CarTypes} from "../../data/CarTypes";

class Sedan extends Car{
    constructor(){
        super();
        this.type = CarTypes.SEDAN;
    }
};

export default Sedan;
