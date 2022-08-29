import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";


export default class UTApprovedStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: GenericTaskIntf; parent: any }) {
      super({
        myRefName: "underwrittingApprovedFFormRef",
        disabled: true,
      });
      this.taskRoot = taskRoot;
      this.parent = parent;
  
      this.addField(
        new FTextFieldMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "taskInput.fileId", 
            label: "File Id",
            mandatory: true,
            disabled: true
        })
      ).addField(
        new FSwitchMDP({
            parentMDP: this.childMDP,
            dataSelectorKey: "taskOutput.underwrittingApproved", 
            label: "Underwritting Approved",
            mandatory: true,
            disabled: true
        }))
    }
}