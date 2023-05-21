import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Data from "@/../src-gen/data";

import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellBtnMDP from "@/components/generic/table/cell/FCellBtnMDP";
import FCellPhoneMDP from "@/components/generic/table/cell/FCellPhoneMDP";
import FCellEmailMDP from "@/components/generic/table/cell/FCellEmailMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";

import * as Action from "@/../src-gen/action";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";

export default class RequestedPartnerListFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor(props: { parent: any }) {
    super({
      myRefName: "requestedPartnerListFDataTableRef",
      enableSearch: true,
      title: "Pending Activation Partners",
      itemKey: "partnerId",
      enableShowHideColumns: true,
      enableSerialNumber: true,
    });
    this.parent = props.parent;
    this.addColumn({
      label: "PARTNER NAME",
      dataSelectorKey: "fullname",
      columnCellMDP: new FCellBtnMDP({
        onClick: () => {},
        color: "purple",
      }),
    })
      .addColumn({
        label: "EMAIL",
        dataSelectorKey: "emailId",
        columnCellMDP: new FCellEmailMDP(),
      })
      .addColumn({
        label: "PHONE",
        dataSelectorKey: "mobile",
        columnCellMDP: new FCellPhoneMDP(),
      })
      .addColumn({
        label: "Registered On",
        dataSelectorKey: "registeredOn",
        columnCellMDP: new FCellDateTimeMDP(),
      })

      .addStatusColumn({
        label: "Status",
        dataSelectorKey: "status.name",
        outlined: true,
        colorCodeData: Data.Color.PARTNER_STATUS,
        filterItemList: Data.Spine.PARTNER_STATUS.list(),
      })
      .addColumn({
        label: "Age Range",
        dataSelectorKey: "ageRange.name",
      })
      .addColumn({
        label: "State",
        dataSelectorKey: "state",
      })

      // .addNumberColumn({
      //     label: "Active Clients",
      //     dataSelectorKey: "onboardedFilesCount",
      // })
      // .addCurrencyColumn({
      //     label: "Total Earnings",
      //     dataSelectorKey: "totalEarnings",
      //     hidden: true

      // }).addCurrencyColumn({
      //     label: "Current Earnings",
      //     dataSelectorKey: "currentEarnings",
      //     hidden: true

      // })
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
      });
  }

  handleActivation() {
    return (item: any) => {
      return new Promise((res) => {
        res(true);
        Action.Spine.ActivatePartner.execute1(item.partnerId, (output) => {});
      });
    };
  }

  handleRejection() {
    return (item: any) => {
      return new Promise((res) => {
        Action.Spine.RejectPartner.execute1(item.partnerId, (output) => {});
        res(true);
      });
    };
  }
}
