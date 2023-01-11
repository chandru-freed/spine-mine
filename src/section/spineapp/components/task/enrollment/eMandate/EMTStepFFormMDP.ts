import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";

export default class EMTStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: FlowTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: FlowTaskIntf; parent: any }) {
    super({
      myRefName: "eMandateFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.eMandateStatus",
        label: "EMandate Status",
        mandatory: true,
        boundaryClass: "col-6",
        readonly: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.eMandateLink",
          label: "EMandate Link",
          mandatory: true,
          boundaryClass: "col-6",
          readonly: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.eMandateId",
          label: "EMandate Id",
          mandatory: true,
          boundaryClass: "col-6",
          readonly: true,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Rescue",
          onClick: this.validateAndSubmit(),
          condition: this.isException(),
        })
      );
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.rescueTask());
    };
  }

  isException() {
    return (
      this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" ||
      this.taskRoot.taskDetails.taskState === "EXIT_Q"
    );
  }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }
}
