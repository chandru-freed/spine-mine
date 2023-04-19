import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP";
import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";

export default class DPMSFFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor({ parent }: { parent: any }) {
        super({
            title: "MSF Payment Schedule", myRefName: "fFeeFDataTableMDP", enableExport: true, itemKey: "msfEntryId", multiSelect: true,
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
            }).addColumn({
                label: "Draft Date",
                dataSelectorKey: "draftDate",
                columnCellMDP: new FCellDateMDP(),
            }).addColumn({ label: "Fee Code", dataSelectorKey: "feeCode", hidden: true })
            .addPsEntryStatusColumn({ dataSelectorKey: "status.name" })
            .addPaymentStatusColumn({ dataSelectorKey: "paymentStatus.name", })
            .addPsPlanStatusColumn({ dataSelectorKey: "psPlanStatus.name", })
            .addCurrencyColumn({
                label: "MSF Amount",
                dataSelectorKey: "msfAmount"
            })
            .addCurrencyColumn({ label: "Total Amount", dataSelectorKey: "totalAmount" })
            .addPaymentProviderColumn({ dataSelectorKey: "paymentProvider.name", hidden: true })
            .addColumn({ label: "UMRN", dataSelectorKey: "umrn", hidden: true })
            .addColumn({
                label: "Remote EMandate Id", dataSelectorKey: "remoteEMandateId", hidden: true,
                columnCellMDP: new FCellBtnMDP({
                    onClick: (item) => this.parent.openEMandateDetails(item),
                    color: "primary"
                }),
            })
            .addEMandateStatusColumn({ dataSelectorKey: "eMandateStatus.name", })
            .addColumn({ label: "Account Number", dataSelectorKey: "accountNumber", hidden: true })
            .addColumn({ label: "Account Holder Name", dataSelectorKey: "accountHolderName", hidden: true })
            .addCurrencyColumn({ label: "EMandate Approved Amount", dataSelectorKey: "eMandateApprovedAmount", hidden: true })
            .addStatusColumn({
                dataSelectorKey: "presentableState",
                label: "Presentable State",
                filterItemList: Data.Spine.PRESENTABLE_STATE.list()
            })
            .addAction({
                label: "Present",
                onClick: this.handlePresentClick(),
                type: ActionType.OTHERS,
                confirmation: true,
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
                itemList.forEach(item=>{
                    Action.Spine.PresentMSFScheduleEntry.execute(item.msfEntryId, output => {
                        res(true)
                    });
                })
                // const msfEntryIdList: string[] = itemList.map(item => item.msfEntryId)
                // Action.Spine.PresentMSFScheduleEntryList.execute1(msfEntryIdList, output => {
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