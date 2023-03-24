import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellTextEllipsisMDP from "@/components/generic/table/cell/FCellTextEllipsisMDP";
import FCellDateTimeEllipsisMDP from "@/components/generic/table/cell/FCellDateTimeEllipsisMDP";

export default class PendingPaymentListFDataTable extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({
            itemKey: "psEntryId",
            disabled: parent.disabledActionBtn,
            title: "Pending Payment List",
            myRefName: "poPendingPaymentFDataTableRef",
            enableExport: true,
            enableSearch: true,
            enableShowHideColumns: true
        });
        this.parent = parent;
        this.addClientFileNumberColumn({
            dataSelectorKey: "clientFileBasicInfo.clientFileNumber",
        }).addColumn({
            label: "Mobile Number",
            dataSelectorKey: "clientBasicInfo.mobile",
            columnCellMDP: new FCellBtnMDP({
                color: "deep-purple",
                onClick: (item) => {
                    this.handleClientClick(item);
                },
            }),
            hidden: true
        })
            .addColumn({
                label: "Payment Type",
                dataSelectorKey: "paymentType.name",
                columnCellMDP: new FCellStatusMDP({}),
                hidden: true
            })
            .addColumn({
                label: "Account Number",
                dataSelectorKey: "accountNumber",
            })
            .addColumn({
                label: "Total Amount",
                dataSelectorKey: "totalAmount",
                columnCellMDP: new FCellCurrencyBtnMDP({
                    color: "secondary",
                    onClick: (item) => {
                        this.parent.openPaymentDetails(item);
                    },
                }),
                align: 'right',
                hidden: true
            }).addColumn({
                label: "SPA Amount",
                dataSelectorKey: "spaAmount",
                columnCellMDP: new FCellCurrencyMDP({
                }),
                align: 'right',
            }).addColumn({
                label: "MSF Amount",
                dataSelectorKey: "msfAmount",
                columnCellMDP: new FCellCurrencyMDP({
                }),
                align: 'right',
            }).addColumn({
                label: "FEE Amount",
                dataSelectorKey: "feeAmount",
                columnCellMDP: new FCellCurrencyMDP({
                }),
                align: 'right',
            })
            .addColumn({
                label: "Payment Ref Number",
                dataSelectorKey: "paymentRefNumber",
                // columnCellMDP: new FCellCurrencyMDP({}),
            }).addColumn({
                label: "Remote Txn Ref Number",
                dataSelectorKey: "remoteTxnRefNumber:String",
            })

            .addColumn({
                label: "Account Holder Name",
                dataSelectorKey: "accountHolderName",
                // columnCellMDP: new FCellCurrencyMDP({}),
                hidden: true
            })
            .addPaymentProviderColumn({
                dataSelectorKey: "paymentProvider.name",
            })
            .addStatusColumn({
                label: "Payment Mode",
                dataSelectorKey: "paymentMode.name",
                filterItemList:Data.Spine.PAYMENT_MODE.list(),
            }).addStatusColumn({
                label: "Settled To",
                dataSelectorKey: "settledTo.name",
                filterItemList: Data.Spine.SETTLED_TO.list(),
            })
            .addPaymentStatusColumn({ label: "Status", dataSelectorKey: "status.name", })
            .addColumn({
                label: "Presented Date",
                dataSelectorKey: "presentedDate",
                columnCellMDP: new FCellDateMDP(),
                hidden: true
            }).addColumn({
                label: "Details",
                dataSelectorKey: "details",
                columnCellMDP: new FCellTextEllipsisMDP(),
                hidden: true
            }).addColumn({
                label: "Received By",
                dataSelectorKey: "receivedBy",
                hidden: true
            }).addColumn({
                label: "Last Updated Time",
                dataSelectorKey: "lastUpdatedTime",
                columnCellMDP: new FCellDateTimeEllipsisMDP(),
                hidden: true
            });
    }

    handleClientFileClick(item: any) {
        this.parent.gotoFile(item.clientFileNumber);
    }

    handleClientClick(item: any) {
        this.parent.gotoClient(item.clientBasicInfo.clientId);
    }
}
