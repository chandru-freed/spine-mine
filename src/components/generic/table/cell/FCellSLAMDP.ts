import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellSLAMDP implements FColumnCellMDP {
    componentName: string = "FCellSLA";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}