import MDP from "../MDP";
import FCellTextMDP from "./cell/FCellTextMDP";
import FColumnCellMDP from "./FColumnCellMDP";

export default class FTableFilterMDP implements MDP {
   
    label: string;
    dataSelectorKey: string | undefined;
    filterItems: any[] ;
    itemKey?: string;
    itemText?: string;
    booleanFilter?: boolean;

    constructor(props: {
        label: string;
        dataSelectorKey: string ;
        filterItems?: any[];
        itemKey?: string;
        itemText?: string;
        booleanFilter?: boolean;
    }) {
        this.label = props.label;
        this.dataSelectorKey = props.dataSelectorKey;
        this.filterItems = props.filterItems || [];
        this.itemKey = props.itemKey || "id";
        this.itemText = props.itemText || "name";
        this.booleanFilter = props.booleanFilter;
    }

    getMetaData(): object {
        return {
            label: this.label,
            dataSelectorKey: this.dataSelectorKey,
            filterItems: this.filterItems,
            itemKey: this.itemKey,
            itemText: this.itemText,
            booleanFilter: this.booleanFilter
        }
    }
}


