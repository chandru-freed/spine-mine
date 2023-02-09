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

export default class FCFAPPScheduleFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent, refName }: { parent: any; refName: string }) {
    super({
      itemKey: "psEntryId",
      disabled: parent.disabledActionBtn,
      myRefName: refName,
      enableShowHideColumns: true,
      multiSelect: true
    });
    this.parent = parent;
    this.addColumn({
      label: "Draft Date",
      dataSelectorKey: "draftDate",
      columnCellMDP: new FCellDateMDP(),
      hidden: true
    })
      .addColumn({
        label: "Status Updated On",
        dataSelectorKey: "statusUpdatedOn",
        columnCellMDP: new FCellDateMDP(),
      })
      .addCurrencyColumn({
        label: "Total Amount",
        dataSelectorKey: "totalAmount",
        rounded: true,
      })
      .addCurrencyColumn({
        label: "SPA Amount",
        dataSelectorKey: "spaAmount",
        rounded: true,
      })
      .addCurrencyColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount" })
      .addColumn({
        label: "Status",
        dataSelectorKey: "status",
        columnCellMDP: new FCellStatusMDP({
          colorCodeData: Data.Color.PS_ENTRY_STATUS,
          outlined: true
        }),
      })
      .addInfo({
        label: "Total",
        value: this.parent.modelValue.paymentPlan.psEntryTotalAmount,
        infoMDP: new FInfoINRMDP({ rounded: true }),
      })
      // .addInfo({
      //   label: "Total Presented",
      //   value: this.parent.modelValue.paymentPlan.psEntryTotalPresentedAmount,
      //   infoMDP: new FInfoINRMDP({ rounded: true }),
      // }).addInfo({
      //   label: "Total Paid",
      //   value: this.parent.modelValue.paymentPlan.psEntryTotalPaidAmount,
      //   infoMDP: new FInfoINRMDP({ rounded: true }),
      // })
      .addInfo({
        label: "Tenure",
        value: this.parent.modelValue.paymentPlan.ppCalculator.tenor,
      })

      .addAction({
        label: "Add Entry",
        onClick: (itemList) => this.handleAddEntryClick(),
        type: ActionType.ADD,
        noSelect: true
      })
      .addAction({
        label: "Remove ",
        onClick: (itemList) => this.handleRemoveClick(itemList),
        type: ActionType.OTHERS,
        confirmation: true,
      })
      .addAction({
        label: "Modify",
        onClick: (itemList) => this.handleModifyClick(itemList),
        type: ActionType.OTHERS,
      }).addAction({
        label: "Download Ps Plan Excel",
        onClick: (item) => this.handleDownloadActiveExcel(),
        type: ActionType.OTHERS,
        noSelect: true
      })
      .addAction({
        label: "Upload Excel",
        onClick: (itemList) => this.handleUploadExcel(),
        type: ActionType.OTHERS,
        noSelect: true
      });
  }
  handlePresentClick(item: any): Promise<any> {
    return new Promise((resolve) => {
      Action.Spine.PresentPSEntry.execute1(item.psEntryId, (output) => {
        Snackbar.show({
          text: "Succesfully update.",
          pos: "bottom-center",
        });
        resolve(true);
      });
    });
  }

  handleSkipClick(item: any): Promise<any> {
    return new Promise((resolve) => {
      Action.Spine.Skip.execute1(item.psEntryId, (output) => {
        Snackbar.show({
          text: "Succesfully update.",
          pos: "bottom-center",
        });
        resolve(true);
      });
    });
    // this.parent.skip(item.psEntryId,callback)
  }

  handleDownloadActiveExcel() {
    return new Promise(res => {
      this.parent.downloadActiveExcel();
    })
  }




  handleUploadExcel() {
    return new Promise(res => {
      this.parent.handleUploadClick();
    })
  }

  handleAddEntryClick() {
    return new Promise((resolve) => {
      this.parent.showAddPsEntryForm = true;
    });
  }


  handleRemoveClick(itemList: any[]) {
    const psEntryIdList = itemList.map(item => item.psEntryId)
    return new Promise(resolve => {
      Action.ClientFile.RemovePSEntryList.execute1(psEntryIdList, output => {
        Snackbar.show({
          text: "Succesfully Removed.",
          pos: "bottom-center",
        });
        resolve(true);
      })
    })
  }

  handleModifyClick(itemList: any[]) {
    return new Promise(resolve => {
      this.parent.modifyAmountPSEListInput.psEntryIdList = itemList.map(item => item.psEntryId);
      this.parent.showModifyForm = true;
    });
  }
}
