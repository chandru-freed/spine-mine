import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellStatusMDP implements FColumnCellMDP {
    componentName: string = "FCellStatus";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}