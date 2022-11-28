import FColumnCellMDP from '../FColumnCellMDP';
export class FColumnINRMDP implements FColumnCellMDP {
    
    constructor() {
    }
    componentName: string = "FColumnINR";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}