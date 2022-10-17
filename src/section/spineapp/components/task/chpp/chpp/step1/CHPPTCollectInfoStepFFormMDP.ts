import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class CHPPTCollectInfoStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({
    taskRoot,
    parent,
  }: {
    taskRoot: ManualTaskIntf;
    parent: any;
  }) {
    super({
      myRefName: "chppFormRef",
      disabled: taskRoot.taskDisabled,
      dataSelectorKey: "taskOutput",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditorInfo.creditorName",
        label: "Creditor Name",
        boundaryClass: "col-6",
      })
    )
      .addField(
        new FPhoneFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "creditorInfo.creditorPhoneNumber",
          label: "Creditor Phone Number",
          boundaryClass: "col-6",
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "creditorInfo.creditor",
          label: "Creditor",
          boundaryClass: "col-6",
        })
      )
      .addField(
        new FTextareaMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "creditorInfo.harassmentDetails",
          label: "Harassment Details",
          mandatory: true,
          boundaryClass: "col-6",
        })
      ).addAction(
            new FBtnMDP({
                label: "Previous",
                onClick: () => { },
                disabled: true
            })
        )
      .addAction(
        new FBtnMDP({
          label: "Save",
          onClick: this.validateAndSubmit(),
        })
      ).addAction(
        new FBtnMDP({
          label: "Save & Next",
          onClick: this.validateAndSubmit(),
        })
      )
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  validateAndSubmit() {
    
    return () => {
      this.getMyRef().submitForm(this.saveTask());
    };
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

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }
}
