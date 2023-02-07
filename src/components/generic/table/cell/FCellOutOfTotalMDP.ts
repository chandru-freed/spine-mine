import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellOutOfTotalMDP implements FColumnCellMDP {
    totalDataSelectorKey: string;
    valueDataSelectorKey: string;
    constructor(props: {
        valueDataSelectorKey: string,
        totalDataSelectorKey: string,
    }) {
        this.valueDataSelectorKey = props.valueDataSelectorKey;
        this.totalDataSelectorKey = props.totalDataSelectorKey;
    }
    componentName: string = "FCellOutOfTotal";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                valueDataSelectorKey: this.valueDataSelectorKey,
                totalDataSelectorKey: this.totalDataSelectorKey,
            }
        }
    }

}