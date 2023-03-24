import FBtnMDP from "@/components/generic/FBtnMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class RequestedPartnerListDateSearchFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "requestedPartnerListListDateSearch",
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "fromRegisteredOnDateFilter",
        label: "From Date",
        boundaryClass: "col-2",
        mandatory: true,
        futureDaysDisabled: false,
      })
    )
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "toRegisteredOnDateFilter",
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
      this.taskRoot.getNonActivePartnerList();
    };
  }
}
