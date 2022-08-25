import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";

export default class CHPPTFinalStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: GenericTaskIntf;
  parent: any;
  constructor({
    taskRoot,
    parent,
  }: {
    taskRoot: GenericTaskIntf;
    parent: any;
  }) {
    super({
      myRefName: "chppFinalFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this
      .addAction(
        new FBtnMDP({
          label: "Mark Complete",
          onClick: this.validateAndMarkComplete(),
          btnType: BtnType.FILLED,
        })
      );
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  
  validateAndMarkComplete() {
    return () => {
      this.getMyRef().submitForm(this.saveAndMarkCompleteTask());
    };
  }

  saveAndMarkCompleteTask() {
    return () => {
      this.taskRoot.saveAndMarkCompleteTask();
    };
  }
}