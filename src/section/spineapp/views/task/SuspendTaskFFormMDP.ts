import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateTimeSelectFieldMDP from "@/components/generic/form/field/FDateTimeSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import FAutoCompleteFieldMDP from "@/components/generic/form/field/FAutoCompleteFieldMDP";
import { DispositionType } from "@/components/generic/form/field/DispositionFMiniFormMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";

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
        boundaryClass: "col-4",
        pastDaysDisabled: true,
        mandatory: true,
      })
    )
      // .addField(
      //   new FTextFieldMDP({
      //     dataSelectorKey: "reason",
      //     label: "Reason",
      //     parentMDP: this.childMDP,
      //     boundaryClass: "col-6",
      //   })
      // )
      .addField(
        new FAutoCompleteFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "disposition.dispositionType",
          label: "Disposition Type",
          options: [
            new DispositionType({
              label: "Callback Requested",
              value: "Callback Requested",
            }),

            new DispositionType({
              label: "Followup Required",
              value: "FollowupRequired",
            }),
          ],
          itemText: "label",
          itemValue: "value",
          mandatory: true,
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FTextareaMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "disposition.dispositionDetails",
          label: "Disposition Descritpion",
          boundaryClass: "col-4",
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
