import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import * as Data from "@/../src-gen/data";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class CCITMarkCompleteStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
    super({
      myRefName: "verifyForm",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this
    .addField(
      new FSwitchMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "taskOutput.collectMSFNow",
        label: "Collect MSF Now",
        boundaryClass: "col-4",
      })
    )
    .addField(new FSelectFieldMDP({
      dataSelectorKey: "taskOutput.exceptionTakenList",
      label: "Exception Taken",
      options: Data.Spine.EXCEPTION_TAKEN.list(),
      optionLabel: "name",
      optionValue: "id",
      parentMDP: this.childMDP,
      multiple: true,
      boundaryClass: "col-4",
    })).addField(new FGompaUserRemoteAutoCompleteFieldMDP({
      parentMDP: this.childMDP,
      dataSelectorKey: "taskOutput.exceptionApprovedBy",
      label:"Exception ApprovedBy",
      boundaryClass: "col-4",
    }))
  }

  getMyRef(): any {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

}
