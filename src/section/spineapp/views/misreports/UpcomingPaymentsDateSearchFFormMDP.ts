import FBtnMDP from "@/components/generic/FBtnMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class UpcomingPaymentsDateSearchFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();

  constructor({}: {}) {
    super({
      myRefName: "upcoumingPaymentsDateSearch",
    });

    this.addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "fromDate",
        label: "From Date",
        boundaryClass: "col-2",
        mandatory: true,
        futureDaysDisabled: false,
      })
    )
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "toDate",
          label: "To Date",
          boundaryClass: "col-2",
          mandatory: true,
          futureDaysDisabled: false,
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
      // this.taskRoot.searchClientFile();
    };
  }
}
