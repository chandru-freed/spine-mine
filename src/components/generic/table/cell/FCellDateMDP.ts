import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellDateMDP implements FColumnCellMDP {
    componentName: string = "FCellDate";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}