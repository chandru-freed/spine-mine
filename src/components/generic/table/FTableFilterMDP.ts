import MDP from "../MDP";
import FCellTextMDP from "./cell/FCellTextMDP";
import FColumnCellMDP from "./FColumnCellMDP";

export default class FTableFilterMDP implements MDP {
   
    label: string;
    dataSelectorKey: string | undefined;
    filterItems: any[] ;
    itemKey?: string;
    itemText?: string;

    constructor(props: {
        label: string;
        dataSelectorKey: string ;
        filterItems: any[];
        itemKey?: string;
        itemText?: string;
    }) {
        this.label = props.label;
        this.dataSelectorKey = props.dataSelectorKey;
        this.filterItems = props.filterItems || [];
        this.itemKey = props.itemKey || "id";
        this.itemText = props.itemText || "name";
    }

    getMetaData(): object {
        return {
            label: this.label,
            dataSelectorKey: this.dataSelectorKey,
            filterItems: this.filterItems,
            itemKey: this.itemKey,
            itemText: this.itemText
        }
    }
}


