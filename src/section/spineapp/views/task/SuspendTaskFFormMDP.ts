import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateTimeSelectFieldMDP from "@/components/generic/form/field/FDateTimeSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

export default class SuspendTaskFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  root: any;
  constructor({ root }: { root: any }) {
    super({ myRefName: "suspendTaskFFormRef" });
    this.root = root;
    this.addField(
      new FDateTimeSelectFieldMDP({
        dataSelectorKey: "resumeOn",
        label: "resumeOn",
        parentMDP: this.childMDP,
        boundaryClass: "col-6",
        pastDaysDisabled: true,
        mandatory: true,
      })
    )
      .addField(
        new FTextFieldMDP({
          dataSelectorKey: "reason",
          label: "Reason",
          parentMDP: this.childMDP,
          boundaryClass: "col-6",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Suspend",
          onClick: this.submitSuspendClick(),
        })
      );
    // this.root = props.root;
  }

  getMyRef() {
    console.log(this.root.$refs[this.myRefName]);
    return this.root.$refs[this.myRefName];
  }

  submitSuspendClick() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.handleSuspendClick();
      });
    };
  }

  handleSuspendClick() {
    Action.TaskList.Suspend.execute(this.root.suspendTaskInput, (output) => {
      this.root.clearTableAndForm();
    });
  }
}
