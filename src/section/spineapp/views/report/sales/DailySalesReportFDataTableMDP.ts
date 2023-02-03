import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellOutOfTotalMDP from "@/components/generic/table/cell/FCellOutOfTotalMDP";
import FExpansionTextMDP from "@/components/generic/table/expansion/FExpansionTextMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import SalesRepSalesListFDataTableMDP from "./SalesRepSalesListFDataTableMDP";

export default class DailySalesReportFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props:{parent: any}) {
        super({myRefName: "dailySalesReportFDataTableRef",itemKey:"salesRep",enableSearch: true,multiSelect: false});
        this.parent = props.parent;
        this.addColumn({
            dataSelectorKey: "salesRep",
            label: "Sales Rep",
            columnCellMDP: new  FCellBtnMDP({
                color: "deep-purple",
                onClick: () => {},
                icon: "mdi-account",
            }),
            width:"10%"
            
        })
        .addColumn({
            dataSelectorKey: "totalSales",
            label: "Total Sales",
            align:"right",
            width:"10%"
        })
        .addCurrencyColumn({
            dataSelectorKey: "totalDebt",
            label: "Total Debt",
        }).addCurrencyColumn({
            dataSelectorKey: "totalMSF",
            label: "Total MSF",
        }).addColumn({
            dataSelectorKey: "totalSPADone",
            label: "EMandate",
            columnCellMDP: new FCellOutOfTotalMDP({
                totalDataSelectorKey: "totalSales",
                valueDataSelectorKey: "totalSPADone",
            }),
            align:"right"
        }).addColumn({
            dataSelectorKey: "totalMSFDone",
            label: "MSF",
            columnCellMDP: new FCellOutOfTotalMDP({
                totalDataSelectorKey: "totalSales",
                valueDataSelectorKey: "totalMSFDone"
            }),
            align:"right"
        }).addColumn({
            dataSelectorKey: "totalCCDone",
            label: "Compliance",
            columnCellMDP: new FCellOutOfTotalMDP({
                totalDataSelectorKey: "totalSales",
                valueDataSelectorKey: "totalCCDone",
            }),
            width:"7%",
            align:"right"
        })
        
        .setExpansionComponent(new SalesRepSalesListFDataTableMDP({dataSelectorKey:"salesList"}))
    }
}