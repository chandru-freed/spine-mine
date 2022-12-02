import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellINRMDP implements FColumnCellMDP {
    
    constructor() {
    }
    componentName: string = "FCellINR";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}