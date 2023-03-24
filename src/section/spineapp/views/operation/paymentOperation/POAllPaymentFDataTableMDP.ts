import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellCurrencyBtnMDP from "@/components/generic/table/cell/FCellCurrencyBtnMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";

export default class POAllPaymentFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({
            itemKey: "psEntryId",
            disabled: parent.disabledActionBtn,
            title: "Payment List",
            myRefName: "poAllPaymentFDataTableRef",
            enableExport: true,
            groupBySummaryFunction: (itemList) => this.calculateTotalAmount(itemList)
        });
        this.parent = parent;
        this.addClientFileNumberColumn({
            label: "ClientFile Number",
            dataSelectorKey: "clientFileBasicInfo.clientFileNumber",
        }).addColumn({
            label: "Mobile Number",
            dataSelectorKey: "clientBasicInfo.mobile",
            columnCellMDP: new FCellPhoneMDP(),
            hidden: true
        })
            .addStatusColumn({
                label: "Payment Type",
                dataSelectorKey: "paymentType.name",
                filterItemList: Data.Spine.PAYMENT_TYPE.list()
            })

            .addColumn({
                label:"Payment Ref Number",
                dataSelectorKey:"paymentRefNumber",
                columnCellMDP: new FCellBtnMDP({
                    color: "secondary",
                    onClick: (item) => {
                        this.parent.openPaymentDetails(item);
                    },
                }),
            })

            .addCurrencyColumn({
                label: "Total Amount",
                dataSelectorKey: "totalAmount",
            })
            .addColumn({
                label: "Account Holder Name",
                dataSelectorKey: "accountHolderName",
                // columnCellMDP: new FCellCurrencyMDP({}),
            })
            .addStatusColumn({
                label: "Payment Provider",
                dataSelectorKey: "paymentProvider.name",
                filterItemList: Data.Spine.PAYMENT_PROVIDER.list(),

            })
            .addPaymentStatusColumn({ label: "Status", dataSelectorKey: "status.name",})
            .addColumn({
                label: "Presented Date",
                dataSelectorKey: "presentedDate",
                columnCellMDP: new FCellDateMDP(),
            })
            .addColumn({
                label: "Received By",
                dataSelectorKey: "receivedBy",

            })
    }

    calculateTotalAmount(itemList: any) {
        const totalAmount =  itemList.reduce((acc: number, item: any) => {
              const val = typeof(item['totalAmount'])=='number'?item['totalAmount']: 0;
              acc = acc + val;
              return acc
            },0)
        return 'Total Amount:'+ totalAmount;
    }
    handleClientClick(item: any) {
        this.parent.gotoClient(item.clientBasicInfo.clientId);
    }
}
