import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FSelectDateFieldMDP from "../../form/field/FDateSelectFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCurrencyFieldMDP from "../../form/field/FCurrencyFieldMDP";

export default class FPaymentCalculatorFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({
    taskRoot,
    parent,
    disabled,
    readonly = false,
  }: {
    taskRoot: any;
    parent: any;
    disabled: boolean;
    readonly?: boolean;
  }) {
    // console.log(taskRoot.taskFormData.taskOutput.paymentPlan, "Payment  plan");
    super({
      myRefName: "amendmentPaymentCalculatorFormRef",
      disabled: disabled,
      dataSelectorKey: "newPaymentPlan"
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.readonly = readonly;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.ppCode",
        label: "Program Code",
        mandatory: true,
        options: ["PM", "AF"],
        boundaryClass: "col-3",
      })
    )
    // .addField(
    //   new FCurrencyFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "creditorInfo.totalDebt",
    //     label: "Outstanding Amount",
    //     mandatory: true,
    //     boundaryClass: "col-3",
    //     disabled: true
    //   })
    // )
    .addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.settlementPercentage",
        label: "Settlement Percentage",
        boundaryClass: "col-3",
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.repaymentAmount",
        label: "Repayment Amount",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.firstDraftDate",
        label: "First Draft Date",
        mandatory: true,
        boundaryClass: "col-3",
        pastDaysDisabled: true,
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.spaDraftDay",
        label: "SPA Draft Day",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.feeFirstDraftDate",
        label: "Fee First Draft Date",
        mandatory: true,
        boundaryClass: "col-3",
        pastDaysDisabled: true
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.msfDraftDay",
        label: "MSF Draft Day",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.tenor",
        label: "Tenor",
        mandatory: true,
        boundaryClass: "col-3",
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.msfDraftAmount",
        label: "MSF Amount",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.totalMonthlyObligation",
        label: "Monthly Obligation",
        boundaryClass: "col-3",
        disabled: true,
      })
    )
    // .addField(
    //   new FCurrencyFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "budgetInfo.proposedDSPayment",
    //     label: "Affordability",
    //     boundaryClass: "col-3",
    //     disabled: true,
    //   })
    // )
    .
    addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCalculator.feeCode",
        label: "Fee Code",
        mandatory: true,
        boundaryClass: "col-3",
        options: ["MSFFee"]
      })
    ).addAction(
      new FBtnMDP({
        label: "Calculate Payment Schedule",
        onClick: this.calculatePaymentSchedule(),
      })
    );
  }

  getMyRef() {
    console.log(this.parent.getMyRef(),"Ref");
    return this.parent.getMyRef().$refs[this.myRefName];
  }

  calculatePaymentSchedule() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.schedulePaymentPlan();
      });
    };
  }

  schedulePaymentPlan(callback?: () => void) {
    const parentComponent = this.parent.getMyRef();
    console.log(parentComponent,"parentComponent")
    const input = Data.Spine.SchedulePaymentPlanInput.fromJson(
      parentComponent.modelValue.newPaymentPlan
    );
    input.clientFileId = parentComponent.clientFileBasicInfo.clientFileId;
    console.log(parentComponent,"parentComponent")
    input.ppCalculator.outstanding =
    parentComponent.modelValue.newCreditorInfo.totalDebt;
    input.taskId = parentComponent.taskId;
    Action.Spine.SchedulePaymentPlan.execute(input, (output: any) => {
      console.log(output)
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
      if(callback) {
        callback();
      }
    });
  }
}
