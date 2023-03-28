import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";

import * as Data from "@/../src-gen/data";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";

export default class DPFilterFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({
      myRefName: "poFilterFFormRef",
    });
    this.parent = parent;

    this
      .addField(
        new FSelectDateFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "scheduledDraftDate",
          label: "Schedule Draft Date",
          boundaryClass: "col-4",
          onSelect:  this.searchPaymentOperations()
        })
      )
      
      // .addAction(
      //   new FBtnMDP({
      //     label: "Search",
      //     onClick: this.searchPaymentOperations(),
      //   })
      // );
  }

  getMyRef(): any {
    return this.parent.$refs[this.myRefName];
  }

  searchPaymentOperations() {
    return () => {
      this.parent.handleSearchPaymentOperations();
      
    };
  }
}
