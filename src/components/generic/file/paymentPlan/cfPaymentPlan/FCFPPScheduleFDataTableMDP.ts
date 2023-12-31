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
import FCellCopyMDP from "@/components/generic/table/cell/FCellCopyMDP";
import FCellDateTimeMDP from "@/components/generic/table/cell/FCellDateTimeMDP";
import FCellRouterLinkMDP from "@/components/generic/table/cell/FCellRouterLinkMDP";

export default class FCFPPScheduleFDataTableMDP extends FDataTableMDP {
  parent: any;
  constructor({ parent, refName }: { parent: any; refName: string }) {
    super({
      itemKey: "psEntryId",
      disabled: parent.disabledActionBtn,
      myRefName: refName,
      enableShowHideColumns: true,
      enableSearch: false,
    });
    this.parent = parent;
    this.addColumn({
      label: "Draft Date",
      dataSelectorKey: "draftDate",
      columnCellMDP: new FCellDateMDP(),
    })
      .addColumn({
        label: "Status Updated On",
        dataSelectorKey: "statusUpdatedOn",
        columnCellMDP: new FCellDateTimeMDP(),
        hidden: true,
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
      .addPsEntryStatusColumn({ dataSelectorKey: "status" })

      .addColumn({
        label: "Linked EMandate",
        dataSelectorKey: "linkedEMandate.label",
        columnCellMDP: new FCellCopyMDP({
          dataSelectorKeyToCopy: "linkedEMandate.redirectUrl",
          dataSelectorKey: "label"
        }),
        hidden: true
      })
      .addColumn({
        label: "Remote EMandate Id",
        dataSelectorKey: "linkedEMandate.remoteEMandateId",
        hidden: true,
        columnCellMDP: new FCellRouterLinkMDP({
          routerName: "Root.CFile.CFPayment.CFEMandateDetails.CFEMandateDetails",
          paramKey: "linkedEMandate.eMandateId",
          paramName: "eMandateId"
        })
      })

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
      });

    this.addAction({
      label: "Present",
      onClick: (item) => this.handlePresentClick(item),
      type: ActionType.OTHERS,
      confirmation: true,
      singleSelect: true,
    })
      .addAction({
        label: "Skip",
        onClick: (item) => this.handleSkipClick(item),
        type: ActionType.OTHERS,
        confirmation: true,
        singleSelect: true,
      })
      .addAction({
        label: "Add Entry",
        onClick: (item) => this.handleAddEntryClick(),
        type: ActionType.ADD,
        confirmation: true,
        disabled: this.disabled,
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

  handleAddEntryClick() {
    return new Promise((resolve) => {
      this.parent.showAddPsEntryForm = true;
    });
  }
}
