import FBtnMDP from "@/components/generic/FBtnMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class DailySalesFilterFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "upcoumingPaymentsDateSearch",
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "saleDate",
        label: "Sale Date",
        boundaryClass: "col-2",
        mandatory: true,
        futureDaysDisabled: false,
        onSelect: this.getCFSalesListForDate()
      })
    )
  }

  getCFSalesListForDate() {
    return () => {
      this.taskRoot.getCFSalesListForDate();
    };
  }
}
