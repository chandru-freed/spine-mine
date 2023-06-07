import FCellBooleanMDP from "@/components/generic/table/cell/FCellBooleanMDP";
import FExpansionFDataTableMDP from "@/components/generic/table/expansion/FExpansionFDataTableMDP";

export default class SalesRepSalesListFDataTableMDP extends FExpansionFDataTableMDP {
    constructor(props: {
        dataSelectorKey: string
    }) {
        super({myRefName: "SalesRepSalesListFDataTableRef",dataSelectorKey: props.dataSelectorKey, hideDefaultFooter: true, outlined: false, enableSearch: false
    });

        this.addClientFileNumberColumn({
            label: "Client File",
            dataSelectorKey: "clientFleNumber",
        }).addCurrencyColumn({
            label: "SPA Amount",
            dataSelectorKey: "spaAmount",
            width:"15%"
        }).addCurrencyColumn({
            label: "Total Debt",
            dataSelectorKey: "outstanding",
            
        }).addCurrencyColumn({
            label: "Total MSF",
            dataSelectorKey: "msfAmount"
        }).addColumn({
            label: "EMandate",
            dataSelectorKey: "isEMandateActive",
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
        })
        // .addColumn({
        //     label: "Compliance",
        //     dataSelectorKey: "isCCDone",
        //     columnCellMDP: new FCellBooleanMDP({
        //     }),
        //     width:"7%",
        //     align:"right"
        // })
        
        .addBlankColumn({
            width:"3%"
        })
        
    }
}