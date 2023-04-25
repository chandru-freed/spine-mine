import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellTextEllipsisMDP from "@/components/generic/table/cell/FCellTextEllipsisMDP";
import FCellDateTimeEllipsisMDP from "@/components/generic/table/cell/FCellDateTimeEllipsisMDP";
import FInfoINRMDP from "@/components/generic/table/info/FInfoINRMDP";

export default class SpaDashboardFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({
            title: "SPA Balance",
            myRefName: "spaBalanceFDataTableRef",
            enableExport: true,
            enableSearch: true,
            enableShowHideColumns: true
        });
        this.parent = parent;
        this.addColumn({
            label: "Month Year",
            dataSelectorKey: "acctBalMonthYear"
            })
            .addCurrencyColumn({
                label: "SPA Collection",
                dataSelectorKey: "spaCollection"
            })
            .addCurrencyColumn({
                label: "MSF Collection",
                dataSelectorKey: "msfCollection"
            })
            .addCurrencyColumn({
                label: "Settlement Fee Collection",
                dataSelectorKey: "settlementFeeCollection"
            })
            .addCurrencyColumn({
                label: "Settlement Amount",
                dataSelectorKey: "settlementAmount"
            })
            .addCurrencyColumn({
                label: "Refund Amount",
                dataSelectorKey: "refundAmount"
            })
            .addColumn({
                label: "Acct Closed for Month",
                dataSelectorKey: "noOfSettledAccountsForMonth"
            })
            .addCurrencyColumn({
                label: "SPA Balance",
                dataSelectorKey: "spaBalanceForMonth"
            })
            .addInfo({
                label: "Current SPA Balance",
                value: this.parent.currentSpaBalance, infoMDP: new FInfoINRMDP({})
            })
            .addInfo({
                label: "Settled Account Total",
                value: this.parent.numOfSettledAccount
            })
            ;
    }

}
