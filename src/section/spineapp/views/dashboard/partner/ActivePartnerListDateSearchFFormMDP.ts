import FBtnMDP from "@/components/generic/FBtnMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

export default class ActivePartnerListDateSearchFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "activePartnerListDateSearch",
    });
    this.taskRoot = taskRoot;

    this.addField(
      new FSelectDateFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "fromActivatedOnDateFilter",
        label: "From Date",
        boundaryClass: "col-2",
        mandatory: true,
        futureDaysDisabled: false,
      })
    )
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "toActivatedOnDateFilter",
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
      this.taskRoot.getActivePartnerList();
    };
  }
}
