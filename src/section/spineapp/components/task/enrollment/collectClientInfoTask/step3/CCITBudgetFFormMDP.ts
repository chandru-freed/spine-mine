import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import CCITIncomeSourcesFBudgetMiniFormMDP from "./CCITIncomeSourcesFBudgetMiniFormMDP";

export default class CCITBudgetFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "budgetFormRef",
      disabled: taskRoot.taskDisabled,
      dataSelectorKey: "budgetInfo"
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new CCITIncomeSourcesFBudgetMiniFormMDP({taskRoot: this.taskRoot, parent: this})
    )
  }

  getMyRef() {
    return this.parent.getMyRef()[0].$refs[this.myRefName]
  }

  submitAddCreditor() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.getMyRef()[0].addCreditorData();
      });
    }
  }

  closeAddForm() {
    this.parent.getMyRef()[0].closeAndClearAllForms();
  }

}
