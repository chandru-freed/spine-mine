import FCellAmountPaymentListMDP from "@/components/generic/table/cell/FCellAmountPaymentListMDP";
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
        super({ myRefName: "dailySalesReportFDataTableRef", itemKey: "salesRep", enableSearch: true, multiSelect: false, enablePagination: false, hideDefaultFooter: true, outlined: false });
        this.parent = props.parent;
        this.addColumn({
            dataSelectorKey: "salesRep",
            label: "Sales Rep",
            columnCellMDP: new FCellBtnMDP({
                color: "deep-purple",
                onClick: () => { },
                
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
                dataSelectorKey: "cfSales",
                label: "MSF",
                columnCellMDP: new FCellAmountPaymentListMDP({
                    itemDataSelectorKey: "msfAmount",
                    paymentDataSelectorKey: "isFirstMSFPaid"
                }),
                align: "right",
            })
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
            // .addInfo({
            //     label: "Total Sales",
            //     value: "2",
            //     infoMDP: new FInfoGamifiedINRMDP({})
            // }).addInfo({
            //     label: "Total Debt",
            //     value: this.parent.totalDashboard.totalSPACollected,
            //     infoMDP: new FInfoGamifiedINRMDP({})
            // })
            // .addInfo({
            //     label: "Total MSF",
            //     value: this.parent.totalDashboard.totalMSF,
            //     infoMDP: new FInfoGamifiedINRMDP({})
            // })

            .setExpansionComponent(new SalesRepSalesListFDataTableMDP({ dataSelectorKey: "cfSales" }))
    }
}