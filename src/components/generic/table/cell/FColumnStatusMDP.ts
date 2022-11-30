import FColumnCellMDP from '../FColumnCellMDP';
export class FColumnStatusMDP implements FColumnCellMDP {
    componentName: string = "FColumnStatus";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}