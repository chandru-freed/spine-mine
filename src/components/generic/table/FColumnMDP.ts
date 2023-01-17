import MDP from "../MDP";
import FCellTextMDP from "./cell/FCellTextMDP";
import FColumnCellMDP from "./FColumnCellMDP";

export default class FColumnMDP implements MDP {
   
    label: string;
    dataSelectorKey: string | undefined;
    align: string = "left";
    sortable?: boolean;
    columnCellMDP?: FColumnCellMDP;
    hidden: boolean;

    constructor(props: {
        label: string;
        dataSelectorKey: string ;
        align?: string;
        sortable?: boolean;
        columnCellMDP?: FColumnCellMDP;
        hidden?: boolean;
    }) {
        this.label = props.label;
        this.dataSelectorKey = props.dataSelectorKey;
        this.align = props.align||"left";
        this.sortable = props.sortable;
        this.hidden = props.hidden || false;
        this.columnCellMDP = props.columnCellMDP || new FCellTextMDP({dataSelectorKey: this.dataSelectorKey});
    }

    getMetaData(): object {
        return {
            text: this.label,
            value: this.dataSelectorKey,
            columnCellMetaData: this.columnCellMDP?.getMetaData(),
            align:this.align,
            sortable: this.sortable,
            hidden: this.hidden
        }
    }
}


