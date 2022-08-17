import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";

export default class CCITPaymentCalculatorFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "paymentCalculatorFormRef",
      disabled: taskRoot.taskDisabled,
      dataSelectorKey: "ppCalculator"
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ppCode",
        label: "Program Code",
        mandatory: true,
        items: ["PM", "AF"],
        boundaryClass: "col-6",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "outstanding",
        label: "Outstanding Amount",
        mandatory: true,
        boundaryClass: "col-6",
      })
    ).addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "tenor",
        label: "Tenor",
        mandatory: true,
        boundaryClass: "col-6",
      })
    ).addField(
      new FDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "firstDraftDate",
        label: "First Draft Date",
        mandatory: true,
        boundaryClass: "col-6",
      })
    ).addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "feeCode",
        label: "Fee Code",
        mandatory: true,
        boundaryClass: "col-6",
        items: ["MSFFee"]
      })
    ).addField(
      new FDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "feeFirstDraftDate",
        label: "Fee First Draft Date",
        mandatory: true,
        boundaryClass: "col-6",
      })
    ).addAction(
      new FBtnMDP({
        label: "Calculate Payment Schedule",
        onClick: this.calculatePaymentSchedule(),
      })
    )
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName]
  }

  calculatePaymentSchedule() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.getMyRef().calculatePaymentSchedule();
        this.parent.getMyRef().calculateFeeSchedule();
      });
    }
  }

  

}
