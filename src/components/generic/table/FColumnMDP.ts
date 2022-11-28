import MDP from "../MDP";
import { FColumnTextMDP } from "./cell/FColumnTextMDP";
import FColumnCellMDP from "./FColumnCellMDP";

export default class FColumnMDP implements MDP {
   
    label: string;
    dataSelectorKey: string | undefined;
    align: string = "left";
    sortable?: boolean;
    columnCellMDP?: FColumnCellMDP;

    constructor(props: {
        label: string;
        dataSelectorKey: string ;
        align?: string;
        sortable?: boolean;
        columnCellMDP?: FColumnCellMDP;
    }) {
        this.label = props.label;
        this.dataSelectorKey = props.dataSelectorKey;
        this.align = props.align||"left";
        this.sortable = props.sortable;
        this.columnCellMDP = props.columnCellMDP || new FColumnTextMDP({dataSelectorKey: this.dataSelectorKey});
    }

    getMetaData(): object {
        return {
            text: this.label,
            value: this.dataSelectorKey,
            columnCellMetaData: this.columnCellMDP?.getMetaData(),
            align:this.align,
            sortable: this.sortable,
        }
    }
}


