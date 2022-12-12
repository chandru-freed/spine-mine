import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellDayPastDueMDP implements FColumnCellMDP {
    componentName: string = "FCellDayPastDue";
    getMetaData(): object {
        return {
            componentName: this.componentName,
        }
    }

}