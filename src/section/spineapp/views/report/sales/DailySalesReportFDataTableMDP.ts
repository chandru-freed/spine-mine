import FCellBooleanListMDP from "@/components/generic/table/cell/FCellBooleanListMDP";
import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellListMDP from "@/components/generic/table/cell/FCellListMDP";
import FCellOutOfTotalMDP from "@/components/generic/table/cell/FCellOutOfTotalMDP";
import FExpansionTextMDP from "@/components/generic/table/expansion/FExpansionTextMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FInfoINRMDP from "@/components/generic/table/info/FInfoINRMDP";
import SalesRepSalesListFDataTableMDP from "./SalesRepSalesListFDataTableMDP";

export default class DailySalesReportFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props: { parent: any }) {
        super({ myRefName: "dailySalesReportFDataTableRef", itemKey: "salesRep", enableSearch: true, multiSelect: false });
        this.parent = props.parent;
        this.addColumn({
            dataSelectorKey: "salesRep",
            label: "Sales Rep",
            columnCellMDP: new FCellBtnMDP({
                color: "deep-purple",
                onClick: () => { },
                icon: "mdi-account",
            }),
            width: "10%"

        })
            .addColumn({
                dataSelectorKey: "totalSales",
                label: "Total Sales",
                align: "right",
                width: "10%"
            })
            .addCurrencyColumn({
                dataSelectorKey: "totalDebt",
                label: "Total Debt",
            }).addColumn({
                dataSelectorKey: "salesList",
                label: "MSF",
                columnCellMDP: new FCellListMDP({
                    itemDataSelectorKey: "msfAmount",
                }),
                align: "right"
            })
            // .addCurrencyColumn({
            //     dataSelectorKey: "totalMSF",
            //     label: "Total MSF",
            // })
            .addColumn({
                dataSelectorKey: "enachDoneList",
                label: "Enach",
                columnCellMDP: new FCellBooleanListMDP({}),
                align: "right"
            }).addColumn({
                dataSelectorKey: "ccDoneList",
                label: "Compliance",
                columnCellMDP: new FCellBooleanListMDP({}),
                width: "15%",
                align: "right"
            })

            .setExpansionComponent(new SalesRepSalesListFDataTableMDP({ dataSelectorKey: "salesList" }))
    }
}