import FDataTableMDP, { ActionType } from "@/components/generic/table/FDataTableMDP"
import * as Action from "@/../src-gen/action";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import * as Snackbar from "node-snackbar";
import * as Data from "@/../src-gen/data";

export default class SPAScheduleTableMDP extends FDataTableMDP {

  root: any;
  constructor({ root }: { root: any }) {
    super({
      myRefName: "spaScheduleTableRef",
      // dataSelectorKey: "stSpaEntryList",
      itemKey: "stEntryId"
    });
    this.root = root;

    this.addPaymentProviderColumn({
      dataSelectorKey: "paymentProvider",
    })
      .addCurrencyColumn({ label: "SPA Amount", dataSelectorKey: "spaAmount" })
      .addColumn({ label: "Settled To", dataSelectorKey: "settledTo" })
      .addStatusColumn({ label: "Payment Mode", dataSelectorKey: "paymentMode", filterItemList: Data.ClientFile.PAYMENT_MODE.list(), })
      .addStatusColumn({ label: "Settlement Entry Type", dataSelectorKey: "settlementEntryType.name", filterItemList: Data.ClientFile.SETTLEMENT_ENTRY_TYPE.list() })
      

      .addColumn({ label: "DraftDate", dataSelectorKey: "draftDate", columnCellMDP: new FCellDateMDP() })
      .addStatusColumn({ label: "status", dataSelectorKey: "status", filterItemList: Data.Spine.ST_ENTRY_STATUS.list() },)




      .addAction({
        label: "Present",
        onClick: (item) => this.handlePresentClick(item),
        type: ActionType.OTHERS
      })
      .addAction({
        label: "Update Account Info",

        onClick: (item) => this.handleUpdateAccountDetailsClick(item),
        type: ActionType.OTHERS
      })
      // .addAction({
      //   label: "Add STEntry",
      //   onClick: (item) => this.handleAddClick(item),
      //   type: ActionType.ADD
      // })
      .addAction({
        label: "Remove STEntry",
        onClick: (item) => this.handleDeleteClick(item),
        type: ActionType.DELETE,
        confirmation: true
      })

  }

  handlePresentClick(item: any) {
    return new Promise(resolve => {
      Action.ClientFile.PresentSTEntry.execute1(item.stEntryId, (output) => {
        Snackbar.show({
          text: "Succesfully Deleted ST Entry",
          pos: "bottom-center",
        });
        setTimeout(this.root.getSTPaymentPlanDetails, 1000);
        resolve(true);
        this.root.deleteSPAEntry = false;
      });
    });
  }

  handleUpdateAccountDetailsClick(item: any) {
    return new Promise(resolve => {
      this.root.handleUpdateAccountDetailsClick(item);
    });
  }

  handleAddClick(item: any) {
    return new Promise(resolve => {
      this.root.showAddForm();
      resolve(true);
    });
  }


  handleDeleteClick(item: any) {
    return new Promise(resolve => {
      Action.ClientFile.RemoveSTEntry.execute1(item.stEntryId, (output) => {
        Snackbar.show({
          text: "Succesfully Delete ST Entry",
          pos: "bottom-center",
        });
        resolve(true);
      });

    });
  }



}