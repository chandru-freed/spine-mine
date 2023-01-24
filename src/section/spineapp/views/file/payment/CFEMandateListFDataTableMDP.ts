import * as Action from "@/../src-gen/action";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, {
    ActionType,
} from "@/components/generic/table/FDataTableMDP";
import FInfoINRMDP from "@/components/generic/table/info/FInfoINRMDP";
import * as Snackbar from "node-snackbar";
import * as Data from "@/../src-gen/data";

export default class CFEMandateListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent, refName }: { parent: any; refName: string }) {
        super({
            itemKey: "eMandateId",
            disabled: parent.disabledActionBtn,
            myRefName: refName,
        });
        this.parent = parent;
        this.addColumn({
            label: "Account Holder Name",
            dataSelectorKey: "accountHolderName",
        })
            .addColumn({
                label: "Status",
                dataSelectorKey: "eMandateStatus.id",
                columnCellMDP: new FCellStatusMDP({}),
            }).addColumn({
                label: "Account Number",
                dataSelectorKey: "accountNumber",
            }).addColumn({
                label: "IFSC Code",
                dataSelectorKey: "ifscCode",
            }).addColumn({
                label: "Account Type",
                dataSelectorKey: "accountType.name",
            })
            .addCurrencyColumn({
                label: "Amount",
                dataSelectorKey: "amount",
                rounded: true,
            }).addColumn({
                label: "Is Default",
                dataSelectorKey: "isDefault",
                columnCellMDP: new FCellStatusMDP({
                }),
            }).addFilter({
                label: "Is Default",
                dataSelectorKey: "isDefault",
                booleanFilter: true
            })


        this
            .addAction({
                label: "Add Emandate",
                onClick: (item) => this.handleAddEMandateClick(),
                type: ActionType.ADD,
                confirmation: true,
                disabled: this.disabled,
            });
    }

    handleSwitchChange() {
        return (val: boolean) => {
            console.log("Val", val)
            this.parent.getEMandateList();
        }
    }
   
    handleAddEMandateClick() {
        return new Promise((resolve) => {
            this.parent.gotoCreateEMandate();
        });
    }
}
