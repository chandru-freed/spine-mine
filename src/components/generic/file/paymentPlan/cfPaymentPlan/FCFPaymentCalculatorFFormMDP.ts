import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";


export default class FCFPaymentCalculatorFFormMDP extends FFormMDP {
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
    super({
      myRefName: "paymentCalculatorFormRef",
      disabled: disabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.readonly = readonly;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.ppCode",
        label: "Program Code",
        mandatory: true,
        options: ["PM", "AF"],
        boundaryClass: "col-3",
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditorInfo.totalDebt",
        label: "Outstanding Amount",
        mandatory: true,
        boundaryClass: "col-3",
        disabled: true
      })
    ) .addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.settlementPercentage",
        label: "Settlement Percentage",
        boundaryClass: "col-3",
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.repaymentAmount",
        label: "Repayment Amount",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.firstDraftDate",
        label: "First Draft Date",
        mandatory: true,
        boundaryClass: "col-3",
        pastDaysDisabled: true,
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.spaDraftDay",
        label: "SPA Draft Day",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.feeFirstDraftDate",
        label: "Fee First Draft Date",
        mandatory: true,
        boundaryClass: "col-3",
        pastDaysDisabled: true
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.msfDraftDay",
        label: "MSF Draft Day",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.tenor",
        label: "Tenure",
        mandatory: true,
        boundaryClass: "col-3",
      })
    )
    .addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.msfDiscountAmount",
        label: "MSF Discount Amount",
        boundaryClass: "col-3",
        disabled: true,
        condition: !!this.taskRoot?.paymentPlanWithTotalDebt?.paymentPlan?.ppCalculator?.msfDiscountAmount && this.taskRoot?.paymentPlanWithTotalDebt?.paymentPlan?.ppCalculator?.msfDiscountAmount>0
      })
    )
    
    .addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.msfDraftAmount",
        label: "MSF Amount",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.totalMonthlyObligation",
        label: "Monthly Obligation",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "budgetInfo.proposedDSPayment",
        label: "Affordability",
        boundaryClass: "col-3",
        disabled: true,
      })
    ).addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.feeCode",
        label: "Fee Code",
        mandatory: true,
        boundaryClass: "col-3",
        options: ["MSFFee"]
      })
    ).addAction(
      new FBtnMDP({
        label: "Calculate Payment Schedule",
        onClick: this.calculatePaymentSchedule(),
        disabled: this.parent.disabledActionBtn
      })
    );
  }

  getMyRef() {
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
    const input = Data.Spine.SchedulePaymentPlanInput.fromJson(
      parentComponent.modelValue.paymentPlan
    );
    input.clientFileId = parentComponent.clientFileBasicInfo.clientFileId;
    input.ppCalculator.outstanding =
    parentComponent.modelValue.creditorInfo.totalDebt;
    input.taskId = parentComponent.taskId;
    Action.Spine.SchedulePaymentPlan.execute(input, (output: any) => {
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
