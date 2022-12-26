import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateTimeSelectFieldMDP from "@/components/generic/form/field/FDateTimeSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import DispositionFMiniFormMDP, { DispositionType } from "../form/field/DispositionFMiniFormMDP";

export default class FSuspendTaskFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any; }) {
    super({ myRefName: "fsuspendTaskFFormRef" });
    this.taskRoot = taskRoot;
    this.addField(
      new FDateTimeSelectFieldMDP({
        dataSelectorKey: "resumeOn",
        label: "ResumeOn",
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
      .addField(new DispositionFMiniFormMDP({
        condition: true,
        dataSelectorKey: "disposition",
        parent: this,
        taskRoot: this.taskRoot,
        dispositionTypeList: [
          new DispositionType({
            label: "Callback Requested",
            value: "Callback Requested",
          }),

          new DispositionType({
            label: "Followup Required",
            value: "FollowupRequired",
          }),
        ]
      }))
      .addAction(
        new FBtnMDP({
          label: "Cancel",
          btnType: BtnType.TEXT,
          onClick: this.handleCancelClick(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Suspend",
          onClick: this.submitSuspendClick(),
        })
      );
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName][0];
  }

  submitSuspendClick() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.handleSuspendClick();
      });
    };
  }

  handleSuspendClick() {
    this.taskRoot.suspendTaskInput.taskId = this.taskRoot.taskId;
    Action.TaskList.Suspend.execute(
      this.taskRoot.suspendTaskInput,
      (output) => {
        this.taskRoot.suspendTaskCancel();
      }
    );
  }

  handleCancelClick() {
    return () => {
      this.taskRoot.suspendTaskCancel();
    };
  }
}
