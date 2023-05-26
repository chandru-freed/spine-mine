import * as Action from "@/../src-gen/action";
import FCellCurrencyMDP from "@/components/generic/table/cell/FCellCurrencyMDP";
import FCellDateMDP from "@/components/generic/table/cell/FCellDateMDP";
import FCellStatusMDP from "@/components/generic/table/cell/FCellStatusMDP";
import FInfoINRMDP from "@/components/generic/table/info/FInfoINRMDP";
import FDataTableMDP, {
  ActionType,
} from "@/components/generic/table/FDataTableMDP";
import * as Snackbar from "node-snackbar";
import * as Data from "@/../src-gen/data";

export default class FEnrollmentPPScheduleFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent, refName }: { parent: any; refName: string }) {
    super({
      itemKey: "psEntryId",
      disabled: parent.disabledActionBtn,
      // title: "Payment Schedule",
      myRefName: refName,
    });
    this.parent = parent;
    this.addColumn({
      label: "Draft Date",
      dataSelectorKey: "draftDate",
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
      // .addCurrencyColumn({ label: "Fee Amount", dataSelectorKey: "feeAmount", })
      // .addColumn({
      //   label: "Status",
      //   dataSelectorKey: "status",
      //   columnCellMDP: new FCellStatusMDP({
      //     colorCodeData: Data.Color.PS_ENTRY_STATUS,
      //     outlined: true
      //   }),
      // }) 
      .addInfo({
        label: "Total",
        value: this.parent.modelValue.paymentPlan.psEntryTotalAmount,
        infoMDP: new FInfoINRMDP({ rounded: true }),
      }).addInfo({
        label: "Total Presented",
        value: this.parent.modelValue.paymentPlan.psEntryTotalPresentedAmount,
        infoMDP: new FInfoINRMDP({ rounded: true }),
      }).addInfo({
        label: "Total Paid",
        value: this.parent.modelValue.paymentPlan.psEntryTotalPaidAmount,
        infoMDP: new FInfoINRMDP({ rounded: true }),
      })
      .addInfo({
        label: "Tenure",
        value: this.parent.modelValue.paymentPlan.ppCalculator.tenor,
      })
      .addAction({
        label: "Apply discount on MSF",
        onClick: (item) => this.handleWaiveClick(),
        type: ActionType.OTHERS,
        disabled: this.disabled,
        noSelect: true,
        condition: this.parent.taskDetails.taskName == 'RetainCancelledFile'
      })
      .addAction({
        label: "Add Entry",
        onClick: (item) => this.handleAddEntryClick(),
        type: ActionType.ADD,
        confirmation: true,
        disabled: this.disabled,

      });
  }

  handleAddEntryClick() {
    return new Promise((resolve) => {
      this.parent.showAddPsEntryForm = true;
    });
  }
  handleWaiveClick() {
    return new Promise((resolve) => {
      this.parent.showApplyDiscountOnMsfForm = true;
    });
  }
}
