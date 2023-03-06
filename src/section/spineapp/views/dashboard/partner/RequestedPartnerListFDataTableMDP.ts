
import FDataTableMDP, {
    ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";

import * as Action from '@/../src-gen/action';

export default class RequestedPartnerListFDataTableMDP extends FDataTableMDP {
    parent: any;
    constructor(props: { parent: any }) {
        super({
            myRefName: "requestedPartnerListFDataTableRef",
            enableSearch: true,
            title: "Requested Partners",
            itemKey: "partnerId"
        });
        this.parent = props.parent;
        this
            .addColumn({
                label: "Full Name",
                dataSelectorKey: "fullname",
                columnCellMDP: new FCellBtnMDP({
                    onClick: () => { },
                    color: "purple"
                })
            })
            .addColumn({
                label: "Unique Referral Code",
                dataSelectorKey: "uniqueReferralCode",
                columnCellMDP: new FCellCopyMDP({}),
                width: "15%"
            })
            .addColumn({
                label: "Mobile",
                dataSelectorKey: "mobile",
                columnCellMDP: new FCellPhoneMDP()
            })
            .addColumn({
                label: "EmailId",
                dataSelectorKey: "emailId",
                columnCellMDP: new FCellEmailMDP()
            })
            .addColumn({
                label: "Status",
                dataSelectorKey: "status.name",
                columnCellMDP: new FCellStatusMDP({ outlined: true,colorCodeData:Data.Color.PARTNER_STATUS }),
            })
            .addCurrencyColumn({
                label: "Total Earnings",
                dataSelectorKey: "totalEarnings",

            }).addCurrencyColumn({
                label: "Current Earnings",
                dataSelectorKey: "currentEarnings",

            })

            .addNumberColumn({
                label: "Onboarded Files Count",
                dataSelectorKey: "onboardedFilesCount",
            })
            .addAction({
                label: "Activate",
                onClick: this.handleActivation(),
                type: ActionType.OTHERS,
                confirmation: true,
            })
            .addAction({
                label: "Reject",
                onClick: this.handleRejection(),
                type: ActionType.OTHERS,
                confirmation: true,
            })
    }

    handleActivation() {
        return (item: any) => {
            return new Promise(res => {
                res(true);
                Action.Spine.ActivatePartner.execute1(item.partnerId, output => {

                });
            })
        }
    }


    handleRejection() {
        return (item: any) => {
            return new Promise(res => {
                Action.Spine.RejectPartner.execute1(item.partnerId, output => {

                });
                res(true)
            })
        }
    }

}
