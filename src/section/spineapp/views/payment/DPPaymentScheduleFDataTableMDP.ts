import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";
import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import * as Action from "@/../src-gen/action";
import FCellRouterLinkMDP from "@/components/generic/table/cell/FCellRouterLinkMDP";

export default class DPPaymentScheduleFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent, refName }: { parent: any, refName: string }) {
        super({
            itemKey: "psEntryId", disabled: parent.disabledActionBtn, title: "Payment Schedule", myRefName: refName, multiSelect: true, enableExport: true,
            groupBySummaryFunction: (itemList) => this.calculateTotalAmount(itemList)
        });
        this.parent = parent;
        this.addClientFileNumberColumn({ dataSelectorKey: "clientFileBasicInfo.clientFileNumber", })
            .addColumn({
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
                label: "Draft Date",
                dataSelectorKey: "draftDate",
                columnCellMDP: new FCellDateMDP()
            })
            .addPsEntryStatusColumn({ dataSelectorKey: "status.name" })
            .addPaymentStatusColumn({ dataSelectorKey: "paymentStatus.name", hidden: true })
            .addPsPlanStatusColumn({ dataSelectorKey: "psPlanStatus.name", })
            .addCurrencyColumn({
                dataSelectorKey: "spaAmount",
                label: "SPA Amount"
            }).addCurrencyColumn({
                dataSelectorKey: "feeAmount",
                label: "FEE Amount"
            }).addCurrencyColumn({
                dataSelectorKey: "totalAmount",
                label: "Total Amount"
            })
            .addPaymentProviderColumn({
                label:"Payment Provider",
                dataSelectorKey:"paymentProvider.name",
                hidden: true
            })
            .addColumn({
                dataSelectorKey: "umrn",
                label: "UMRN",
                hidden: true
            })
            .addColumn({
                dataSelectorKey: "remoteEMandateId",
                label: "Remote EMandate Id",
                columnCellMDP: new FCellBtnMDP({
                    onClick:(item) => this.parent.openEMandateDetails(item),
                    color:"primary"
                }),
                
            }).addEMandateStatusColumn({ dataSelectorKey: "eMandateStatus.name", })
            .addColumn({
                label: "Account Number",
                dataSelectorKey: "accountNumber"
            }).addColumn({
                label: "Account Holder Name",
                dataSelectorKey: "accountHolderName",
                hidden: true
            }).addCurrencyColumn({
                label: "eMandateApprovedAmount",
                dataSelectorKey: "eMandateApprovedAmount",
                hidden: true
            })
            .addStatusColumn({
                dataSelectorKey: "presentableState",
                label: "Presentable State",
                filterItemList: Data.Spine.PRESENTABLE_STATE.list()
            }).addAction({
                label: "Present",
                onClick: this.handlePresentClick(),
                type: ActionType.OTHERS,
                confirmation: true
            });

    }

    handleClientFileClick(item: any) {
        this.parent.gotoFile(item.clientFileBasicInfo.clientFileNumber);
    }

    handleClientClick(item: any) {
        this.parent.gotoClient(item.clientBasicInfo.clientId);
    }

    handlePresentClick() {
        return (itemList: any[]) => {
            return new Promise(res => {
                console.log(itemList)
                itemList.forEach(item=>{
                    Action.Spine.PresentPSEntry.execute1(item.psEntryId, output => {
                        res(true)
                    });
                })
                // const psEntryIdList: string[] = itemList.map(item => item.psEntryId)
                // Action.Spine.PresentPSEntryList.execute1(psEntryIdList, output => {
                //     res(true)
                // });
            })
        }
    }

    calculateTotalAmount(itemList: any) {
        const totalAmount = itemList.reduce((acc: number, item: any) => {
            const val = typeof (item['totalAmount']) == 'number' ? item['totalAmount'] : 0;
            acc = acc + val;
            return acc
        }, 0)
        return 'Total Amount: ' + totalAmount;
    }
}