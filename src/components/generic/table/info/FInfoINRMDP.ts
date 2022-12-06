import FColumnCellMDP from '../FColumnCellMDP';
export default class FInfoINRMDP implements FColumnCellMDP {
    
    componentName: string = "FInfoINR";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}