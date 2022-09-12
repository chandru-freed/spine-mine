import FBtnMDP from "@/components/generic/FBtnMDP";
import FEmailFieldMDP from "@/components/generic/form/field/FEmailFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import AddressFMiniFormMDP from "@/components/generic/form/field/AddressFMiniFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FPhoneFieldMDP from "@/components/generic/form/field/FPhoneFieldMDP";
import FSelectDateFieldMDP from "../form/field/FDateSelectFieldMDP";

export default class FProfileFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent, myRefName, dataSelectorKey, disabled }: { taskRoot: any; parent: any; myRefName: string; dataSelectorKey?: string; disabled: boolean }) {
    super({
      myRefName: myRefName,
      dataSelectorKey: dataSelectorKey,
      disabled: disabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "gender",
        label: "Gender",
        boundaryClass: "col-6",
        mandatory: true,
        options: [{ id: "FEMALE", name: "Female" }, { id: "MALE", name: "Male" }, { id: "OTHERS", name: "Others" }],
        optionLabel: "name",
        optionValue: "id"
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "secondaryPhone",
        label: "Secondary Phone",
        boundaryClass: "col-6",
      })
    ).addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "dob",
        label: "Date Of Birth",
        boundaryClass: "col-6",
        mandatory: true,
        futureDaysDisabled: true
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "pan",
        label: "PAN",
        boundaryClass: "col-6",
        mandatory: true,
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "motherMaidenName",
        label: "Mother's Maiden Name",
        boundaryClass: "col-6",
        mandatory: true,
      })
    ).addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "fatherName",
        label: "Father's Name",
        boundaryClass: "col-6",
        mandatory: true,
      })
    ).addField(
      new AddressFMiniFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
        dataSelectorKey: "residentialAddress",
        disabled: taskRoot.taskDisabled,
        label: "Residential Address",
        mandatory: true,
      })
    );

  }

}
