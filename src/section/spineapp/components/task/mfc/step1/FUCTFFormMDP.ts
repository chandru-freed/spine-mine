import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import DispositionFMiniFormMDP, {
  DispositionType,
} from "@/components/generic/form/field/DispositionFMiniFormMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FDateTimeSelectFieldMDP from "@/components/generic/form/field/FDateTimeSelectFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FTimeFieldMDP from "@/components/generic/form/field/FTimeFieldMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class FUCTFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  selectedOption: string;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
    super({
      myRefName: "FUCTFFormRef",
      disabled: taskRoot.taskDisabled,
      colWidth: 12,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.selectedTaskOption",
        label: "Select Option",
        options: Object.values(MFCOptions),
        mandatory: true,
      })
    )
      .addField(
        new FDateTimeSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.clientDeferredTime",
          label: "Client Deferred Time",
          condition: this.isClientDeffered(),
        })
      )
      .addField(
        new FDateTimeSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.systemDeferredTime",
          label: "System Deferred Time",
          condition: this.isSystemDeffered(),
        })
      )
      .addField(
        new DispositionFMiniFormMDP({
          taskRoot,
          parent,
          dataSelectorKey: "taskOutput.disposition",
          condition: this.isSystemDeffered(),
          dispositionTypeList: [
            new DispositionType({
              label: "Not Answered",
              value: "NotAnswered",
            }),
          ],
        })
      )
      .addField(
        new DispositionFMiniFormMDP({
          taskRoot,
          parent,
          dataSelectorKey: "taskOutput.disposition",
          condition: this.isClientDeffered(),
          dispositionTypeList: [
            new DispositionType({
              label: "Client Busy",
              value: "ClientBusy",
            }),
            new DispositionType({
              label: "No Enough Funds",
              value: "NoEnoughFunds",
            }),
          ],
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Rescue",
          onClick: this.rescueTask(),
          condition: this.isException(),
        })
      );
  }

  getSelectedOption() {
    return () => {
      this.selectedOption =
        this.taskRoot.taskFormData.taskOutput.selectedTaskOption;
    };
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  // new implement
  validateAndSubmit() {
    return (successCallBack: any) => {
      this.getMyRef().submitForm(() => {
        this.saveTask(() => successCallBack());
      });
    };
  }

  saveTask(successCallBack: any) {
    this.taskRoot.saveTask(() => successCallBack());
  }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }

  isClientDeffered(): boolean {
    return (
      this.taskRoot.selectedMFCTaskOption() === MFCOptions.ClientDeferred
    );
  }

  isSystemDeffered(): boolean {
    return (
      this.taskRoot.selectedMFCTaskOption() === MFCOptions.SystemDeferred
    );
  }

  isStarted() {
    return (
      this.taskRoot.taskDetails.taskState === "STARTED" ||
      this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  isException() {
    return (
      this.taskRoot.taskDetails.taskState === "EXCEPTION_Q" ||
      this.taskRoot.taskDetails.taskState === "EXIT_Q"
    );
  }
}

export enum MFCOptions {
  ClientDeferred = "Call Back Requested",
  SystemDeferred = "Follow Up Required",
}
