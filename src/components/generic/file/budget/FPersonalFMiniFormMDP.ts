import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FMiniFormMDP from "../../form/field/FMiniFormMDP";
import FSelectFieldMDP from "../../form/field/FSelectFieldMDP";
import FTextFieldMDP from "../../form/field/FTextFieldMDP";

export default class FPersonalFMiniFormMDP extends FMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      // dataSelectorKey: "debtRepayments",
      disabled: taskRoot.taskDisabled,
      label: "Personal Info",
      mandatory: true,
      boundaryClass: "col-7",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "name",
        label: "Name",
        boundaryClass: "col-3",
        readonly: true,
      })
    )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "gender",
          label: "Gender",
          options: [
            { id: "FEMALE", name: "Female" },
            { id: "MALE", name: "Male" },
            { id: "OTHERS", name: "Others" },
          ],
          optionLabel: "name",
          optionValue: "id",
          boundaryClass: "col-3",
          readonly: true,
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "age",
          label: "Age",
          // mandatory: true,
          boundaryClass: "col-3",
          readonly: true,
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "dependents",
          label: "Dependents",
          mandatory: true,
          options: [true, false],
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "hasPets",
          label: "Has Pets",
          mandatory: true,
          options: [true, false],
          boundaryClass: "col-3",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "maritalStatus",
          label: "Marital Status",
          boundaryClass: "col-3",
          mandatory: true,
          options: ["Married", "Single", "Separated", "Other"],
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "hasKids",
          label: "Has Kids",
          boundaryClass: "col-3",
          mandatory: true,
          options: [true, false],
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "rentedHouse",
          label: "Rented House",
          boundaryClass: "col-3",
          mandatory: true,
          options: ["Owned", "Rented"],
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "employmentStatus",
          label: "Employment Status",
          boundaryClass: "col-6",
          mandatory: true,
          options: ["Salaried", "Unemployed", "Business"],
        })
      )
      .addField(
        new FTextFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "employeeCompanyName",
          label: "Employee Company Name",
          mandatory: true,
          boundaryClass: "col-6",
        })
      );
  }
}
