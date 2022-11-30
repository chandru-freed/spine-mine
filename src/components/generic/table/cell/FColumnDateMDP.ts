import FColumnCellMDP from '../FColumnCellMDP';
export class FColumnDateMDP implements FColumnCellMDP {
    componentName: string = "FColumnDate";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}