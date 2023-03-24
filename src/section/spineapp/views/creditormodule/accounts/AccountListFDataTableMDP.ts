import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import FCellStandardDateTimeMDP from "@/components/generic/table/cell/FCellStandardDateTimeMDP";
import FInfoINRMDP from "@/components/generic/table/info/FInfoINRMDP";
import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";

export default class AccountListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({ title: "Accounts", myRefName: "accountListFDataTableRef", hideDefaultFooter: true, enablePagination: false });
        this.parent = parent;
        this.addClientFileNumberColumn({ dataSelectorKey: "clientFileNumber"})
            .addColumn({
                label: "Full Name",
                dataSelectorKey: "fullName",
            })
            .addColumn({
                label: "Account Number",
                dataSelectorKey: "accountNumber",
            })
            .addStatusColumn({
                label: "Creditor Status",
                dataSelectorKey: "creditorStatus.name",
                colorCodeData: Data.Color.FICREDITOR_STATUS,
                outlined: true,
                filterItemList: Data.Spine.FICREDITOR_STATUS.list()
            })
            .addCurrencyColumn({
                label: "Creditor Balance",
                dataSelectorKey: "creditorBalance",
            })
            .addCurrencyColumn({
                label: "SPA Saving Amount",
                dataSelectorKey: "spaSavingAmount",
            })
            .addNumberColumn({
                label: "Saving Percentage",
                dataSelectorKey: "savingPercentage",
                enableGroupBy: true
            }).addInfo({
                label: "Total Accounts",
                value: this.parent.creditorStats.totalNumberOfAccounts,

            }).addInfo({
                label: "Settled Accounts",
                value: this.parent.creditorStats.numberOfAccountsSettled,

            }).addInfo({
                label: "Total Debt",
                value: this.parent.creditorStats.totalDebtRegistered,
                infoMDP: new FInfoINRMDP({ rounded: true })
            })
            // .addInfo({
            //     label: "SPA Balance",
            //     value: this.parent.creditorStats.totalAvailablSpaBalanace,
            //     infoMDP: new FInfoINRMDP({ rounded: true })

            // })




    }

    handleClientFileClick(item: any) {
        this.parent.gotoFile(item);
    }

    createAgentClick() {
        return () => {
            return new Promise(res => {
                this.parent.openCreateAgentPage();
                res(true);
            })
        }
    }


}
