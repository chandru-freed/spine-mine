import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FSelectDateFieldMDP from "../../form/field/FDateSelectFieldMDP";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as Snackbar from "node-snackbar";

export default class FPaymentCalculatorFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent, disabled,readonly=false }: { taskRoot: any; parent: any, disabled: boolean;readonly?:boolean }) {
    console.log(taskRoot.taskFormData.taskOutput.paymentPlan, "Payment  plan");
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
        boundaryClass: "col-6",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditorInfo.totalDebt",
        label: "Outstanding Amount",
        mandatory: true,
        boundaryClass: "col-6",
        disabled: true
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.tenor",
        label: "Tenor",
        mandatory: true,
        boundaryClass: "col-6",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.settlementPercentage",
        label: "Settlement Percentage",
        boundaryClass: "col-6",
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.firstDraftDate",
        label: "First Draft Date",
        mandatory: true,
        boundaryClass: "col-6",
      })
    ).addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.feeCode",
        label: "Fee Code",
        mandatory: true,
        boundaryClass: "col-6",
        options: ["MSFFee"]
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.feeFirstDraftDate",
        label: "Fee First Draft Date",
        mandatory: true,
        boundaryClass: "col-6",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.msfDraftDay",
        label: "MSF Draft Day",
        boundaryClass: "col-6",
        disabled: true,
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.msfDraftAmount",
        label: "MSF Amount",
        boundaryClass: "col-6",
        disabled: true,
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.spaDraftDay",
        label: "SPA Draft Day",
        boundaryClass: "col-6",
        disabled: true,
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.totalMonthlyObligation",
        label: "SPA Draft Day",
        boundaryClass: "col-6",
        disabled: true,
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "paymentPlan.ppCalculator.repaymentAmount",
        label: "Repayment Amount",
        boundaryClass: "col-6",
        disabled: true,
      })
    ).addAction(
      new FBtnMDP({
        label: "Calculate Payment Schedule",
        onClick: this.calculatePaymentSchedule(),
      })
    )
  }

  getMyRef() {
    console.log(this.parent.getMyRef())
    return this.parent.getMyRef().$refs[this.myRefName]
  }

  calculatePaymentSchedule() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.schedulePaymentPlan();
      });
    }
  }

  schedulePaymentPlan() {
    const input = Data.Spine.SchedulePaymentPlanInput.fromJson(this.taskRoot.taskFormData.taskOutput.paymentPlan)
    input.clientFileId = (this.taskRoot as any).clientFileBasicInfo.clientFileId;
    input.ppCalculator.outstanding = this.taskRoot.taskFormData.taskOutput.creditorInfo.totalDebt;
    input.taskId = this.taskRoot.taskId;
    Action.Spine.SchedulePaymentPlan.execute(input, (output: any) => {
      Snackbar.show({
        text: "Succesfully Saved",
        pos: "bottom-center",
      });
    })
  }



}
