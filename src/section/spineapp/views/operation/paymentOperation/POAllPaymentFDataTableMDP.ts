import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

export default class POAllPaymentFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({
            itemKey: "psEntryId",
            disabled: parent.disabledActionBtn,
            title: "Payment List",
            myRefName: "poAllPaymentFDataTableRef",
            enableExport: true,
        });
        this.parent = parent;
        this.addColumn({
            label: "ClientFile Number",
            dataSelectorKey: "clientFileNumber",
            columnCellMDP: new FCellBtnMDP({
                color: "secondary",
                icon: "mdi-file-account",
                onClick: (item) => {
                  this.handleClientFileClick(item);
                },
              }),
        }).addColumn({
            label: "Payment Type",
            dataSelectorKey: "paymentType.name",
            //   columnCellMDP: new FCellDateMDP(),
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
            })
            .addColumn({
                label: "Account Holder Name",
                dataSelectorKey: "accountHolderName",
                // columnCellMDP: new FCellCurrencyMDP({}),
            })
            .addColumn({
                label: "Payment Provider",
                dataSelectorKey: "paymentProvider.name",
                columnCellMDP: new FCellStatusMDP({}),
            })
            .addColumn({
                label: "Status",
                dataSelectorKey: "status.name",
                columnCellMDP: new FCellStatusMDP({}),
            }).addColumn({
                label: "Presented Date",
                dataSelectorKey: "presentedDate",
                columnCellMDP: new FCellDateMDP(),
            })
            .addColumn({
                label: "Received By",
                dataSelectorKey: "receivedBy",
                
            }).addFilter({
                label:"Status",
                dataSelectorKey:"status.name",
                filterItems: Data.Spine.PAYMENT_STATUS.list(),
            }).addFilter({
                label:"Payment Provider",
                dataSelectorKey:"paymentProvider.name",
                filterItems: Data.Spine.PAYMENT_PROVIDER.list(),
            });
    }

    handleClientFileClick(item: any) {
        console.log(item,"Client file nyumber")
        this.parent.gotoFile(item.clientFileNumber);
      }
}
