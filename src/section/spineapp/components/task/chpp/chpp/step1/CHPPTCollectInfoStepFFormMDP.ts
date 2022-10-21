import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FRemoteComboBoxFieldMDP from "@/components/generic/form/field/FRemoteComboBoxFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class CHPPTCollectInfoStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
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
        label: "Collector Name",
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
        new FRemoteComboBoxFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "creditorInfo.creditor",
          label: "Creditor",
          mandatory: true,
          boundaryClass: "col-6",
          queryUrl: "/spineapi/master/search-creditor?creditorName=",
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
      );
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  validateAndSubmit() {
    return (successCallBack: any) => {
      this.getMyRef().submitForm(() => {
        this.saveTask(() => successCallBack());
      });
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

  saveTask(successCallBack: any) {
    this.taskRoot.saveTask(() => successCallBack());
  }
}
