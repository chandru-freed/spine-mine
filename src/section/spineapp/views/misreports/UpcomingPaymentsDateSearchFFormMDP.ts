import FBtnMDP from "@/components/generic/FBtnMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class UpcomingPaymentsDateSearchFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({taskRoot}: {taskRoot: any}) {
    super({
      myRefName: "upcoumingPaymentsDateSearch",
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "fromDate",
        label: "From Date",
        boundaryClass: "col-2",
        mandatory: true,
        futureDaysDisabled: true,
      })
    )
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "toDate",
          label: "To Date",
          boundaryClass: "col-2",
          mandatory: true,
          futureDaysDisabled: true,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Search",
          onClick: this.searchClientFile(),
        })
      );
  }

  searchClientFile() {
    return () => {
      this.taskRoot.getSceheduledPaymentList();
    };
  }
}
