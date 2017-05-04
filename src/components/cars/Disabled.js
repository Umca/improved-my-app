import Car from './Car';
import {CarTypes} from "../../data/CarTypes";

class Disabled extends Car{
    constructor(){
        super();
        this.type = CarTypes.DISABLED;
    }
};

export default Disabled;
