import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FMiniFormMDP from "../../form/field/FMiniFormMDP";
import FSelectFieldMDP from "../../form/field/FSelectFieldMDP";
import FTextFieldMDP from "../../form/field/FTextFieldMDP";
import FSelectDateFieldMDP from "../../form/field/FDateSelectFieldMDP";
import FAgeFieldMDP from "../../form/field/FAgeFieldMDP";

export default class FPersonalFMiniFormMDP extends FMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      disabled: taskRoot.taskDisabled,
      label: "Personal Info",
      mandatory: true,
      boundaryClass: "col-7",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    // this.addField(
    //   new FTextFieldMDP({
    //     parentMDP: this.childMDP,
    //     dataSelectorKey: "taskInput.clRegistrationDetails.fullName",
    //     label: "Name",
    //     boundaryClass: "col-3",
    //     disabled: true,
    //     readonly: true,
    //   })
    // )
      // .addField(
      //   new FSelectFieldMDP({
      //     parentMDP: this.childMDP,
      //     dataSelectorKey: "taskOutput.personalInfo.gender",
      //     label: "Gender",
      //     options: [
      //       { id: "FEMALE", name: "Female" },
      //       { id: "MALE", name: "Male" },
      //       { id: "OTHERS", name: "Others" },
      //     ],
      //     optionLabel: "name",
      //     optionValue: "id",
      //     boundaryClass: "col-3",
      //     disabled: true,
      //     readonly: true
      //   })
      // )
      // .addField(
      //   new FAgeFieldMDP({
      //     parentMDP: this.childMDP,
      //     dataSelectorKey: "taskOutput.personalInfo.dob",
      //     label: "Age",
      //     boundaryClass: "col-3",
      //     mandatory: true,
      //     readonly: true,
      //     disabled: true,
      //   })
      // )
      this.addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.budgetInfo.hasDependents",
          label: "Dependents",
          mandatory: true,
          options: [
            { id: true, name: "Yes" },
            { id: false, name: "No" },
          ],
          optionLabel: "name",
          optionValue: "id",
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.budgetInfo.hasPets",
          label: "Has Pets",
          mandatory: true,
          options: [
            { id: true, name: "Yes" },
            { id: false, name: "No" },
          ],
          optionLabel: "name",
          optionValue: "id",
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.budgetInfo.maritalStatus",
          label: "Marital Status",
          boundaryClass: "col-4",
          mandatory: true,
          options: ["Married", "Single", "Separated", "Other"],
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.budgetInfo.hasKids",
          label: "Has Kids",
          boundaryClass: "col-4",
          mandatory: true,
          options: [
            { id: true, name: "Yes" },
            { id: false, name: "No" },
          ],
          optionLabel: "name",
          optionValue: "id",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.budgetInfo.rentedHouse",
          label: "Rented House",
          boundaryClass: "col-4",
          mandatory: true,
          options: ["Owned", "Rented"],
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.budgetInfo.employmentStatus",
          label: "Employment Status",
          boundaryClass: "col-4",
          mandatory: true,
          options: ["Salaried", "Unemployed", "Business"],
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.budgetInfo.employeeCompanyName",
          label: "Employee Company Name",
          mandatory: true,
          boundaryClass: "col-12",
        })
      );
  }
}
