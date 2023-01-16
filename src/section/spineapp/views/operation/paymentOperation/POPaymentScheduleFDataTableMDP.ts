import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";

export default class POPaymentScheduleFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent, refName }: { parent: any, refName: string }) {
        super({ itemKey: "psEntryId", disabled: parent.disabledActionBtn, title: "Payment Schedule", myRefName: refName, multiSelect: true, enableExport: true });
        this.parent = parent;
        this.addColumn({
            label: "ClientFile Number",
            dataSelectorKey: "clientFileBasicInfo.clientFileNumber",
            columnCellMDP: new FCellBtnMDP({
                color: "secondary",
                icon: "mdi-file-account",
                onClick: (item) => {
                    this.handleClientFileClick(item);
                },
            }),
        })
            .addColumn({
                label: "Mobile Number",
                dataSelectorKey: "clientBasicInfo.mobile",
                columnCellMDP: new FCellBtnMDP({
                    color: "deep-purple",
                    onClick: (item) => {
                        this.handleClientClick(item);
                    },
                }),
            })
            .addColumn({
                label: "Draft Date",
                dataSelectorKey: "draftDate",
                columnCellMDP: new FCellDateMDP()
            })
            // .addColumn({ label: "Total Amount", dataSelectorKey: "totalAmount", columnCellMDP: new FCellCurrencyMDP({ rounded: true }) })
            .addColumn({ label: "SPA Amount", dataSelectorKey: "spaAmount", columnCellMDP: new FCellCurrencyMDP({ rounded: true }) })
            // .addColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount", columnCellMDP: new FCellCurrencyMDP({}) })
            .addColumn({
                label: "Status", dataSelectorKey: "status", columnCellMDP: new FCellStatusMDP({
                    colorCodeData: Data.Color.PS_ENTRY_STATUS,
                    outlined: true
                })
            });

    }

    handleClientFileClick(item: any) {
        console.log(item, "Client file nyumber")
        this.parent.gotoFile(item.clientFileBasicInfo.clientFileNumber);
    }

    handleClientClick(item: any) {
        this.parent.gotoClient(item.clientBasicInfo.clientId);
    }
}