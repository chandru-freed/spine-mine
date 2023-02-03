import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";

export default class SalesRepSalesListFDataTableMDP extends FDataTableMDP {
    constructor(props: {
        dataSelectorKey: string
    }) {
        super({myRefName: "SalesRepSalesListFDataTableRef",dataSelectorKey: props.dataSelectorKey, hideDefaultFooter: true, outlined: false
    });

        this.addColumn({
            label: "Client File",
            dataSelectorKey: "clientFleNumber",
            width:"20%"
        }).addCurrencyColumn({
            label: "Total Debt",
            dataSelectorKey: "spaAmount",
        }).addCurrencyColumn({
            label: "Total MSF",
            dataSelectorKey: "msfAmount"
        }).addColumn({
            label: "EMandate",
            dataSelectorKey: "isEMandateDone",
            columnCellMDP: new FCellBooleanMDP({
                color:"green"
            }),
            align:"right"
        }).addColumn({
            label: "MSF",
            dataSelectorKey: "isFirstMSFPaid",
            columnCellMDP: new FCellBooleanMDP({
            }),
            align:"right"
        }).addColumn({
            label: "Compliance",
            dataSelectorKey: "isCCDone",
            columnCellMDP: new FCellBooleanMDP({
            }),
            width:"7%",
            align:"right"
        }).addBlankColumn({
            width:"3%"
        })
        
    }
}