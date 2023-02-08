import FColumnCellMDP from '../FColumnCellMDP';
export default class FCellListMDP implements FColumnCellMDP {
    itemDataSelectorKey: string;
    constructor(props: {
        itemDataSelectorKey: string
    }) {
        this.itemDataSelectorKey = props.itemDataSelectorKey;
    }
    componentName: string = "FCellList";
    getMetaData(): object {
        return {
            componentName: this.componentName,
            props: {
                itemDataSelectorKey:this.itemDataSelectorKey
            }
        }
    }

}