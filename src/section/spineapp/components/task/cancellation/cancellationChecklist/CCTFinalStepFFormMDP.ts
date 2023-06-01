
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCheckboxGroupMDP from "@/components/generic/form/field/FCheckboxGroupMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";





export default class CCTFinalStepFFormMDP extends FFormMDP {
    childMDP = new FFormChildMDP();
    taskRoot: any;
    parent: any;
    constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
        super({
            myRefName: "cancellationChecklistFinalFormRef",
            disabled: taskRoot.taskDisabled,
            dataSelectorKey:"taskOutput"
        });
        this.taskRoot = taskRoot;
        this.parent = parent;

        this
        .addField(new FCheckboxGroupMDP({
          dataSelectorKey: "payload.cancellationCheckList",
          label:"Checklist",
          options: cancellationCheckList,
          parentMDP: this.childMDP,
          optionLabel: "name",
          optionValue:"id",
          boundaryClass:"col-6"
        }))
        .addField(new FTextareaMDP({
          dataSelectorKey: "payload.cancellationDetails",
          label:"Details",
          parentMDP: this.childMDP,
          boundaryClass:"col-6",
          rows:"7"
        }))
        
        .addAction(
            new FBtnMDP({
                label: "Mark Complete",
                onClick: this.saveAndMarkCompleteTask(),
                btnType: BtnType.FILLED,
                disabled:this.taskRoot.checkListNotSuccess()
            })
        );
    }

    saveAndMarkCompleteTask() {
        return () => {
          this.taskRoot.saveAndMarkCompleteTask();
        };
      }
}

export const cancellationCheckList: any[] =[
    {
      name:"Receive Pending Payments (MSF/ Service Fee)",
      id:"receivePendingPayments",
    },
    {
      name:"Refund (SPA)",
      id:"refundSPA",
    },
    {
      name:"Refund extra payments charged (MSF)",
      id:"refundExtraPayments",
    },
    
  ]
