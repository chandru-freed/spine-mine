import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectDateFieldMDP from "@/components/generic/form/field/FDateSelectFieldMDP";

      
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP"; 

      export default class DRPDashboardFilterFFormMDP  extends FFormMDP {
          childMDP = new FFormChildMDP();
          parent: any;
          constructor({ parent }: { parent: any }) {
              super({ myRefName: "DRPDashboardFilterRef"});
              this.parent = parent;
              this
              .addField(
                        new FSelectDateFieldMDP({
                            parentMDP: this.childMDP,
                            dataSelectorKey: "fromDate",
                            label: "From Date",
                            boundaryClass: "col-4"
                        })
                      ).addField(
                        new FSelectDateFieldMDP({
                            parentMDP: this.childMDP,
                            dataSelectorKey: "toDate",
                            label: "To Date",
                            boundaryClass: "col-4",
                            
                        })
                      ).addField(
                        new FTextFieldMDP({
                            parentMDP: this.childMDP,
                            dataSelectorKey: "clientFileNumberContains",
                            label: "Client File Number",
                            boundaryClass: "col-4"
                        })
                      ).addField(
                        new FTextFieldMDP({
                            parentMDP: this.childMDP,
                            dataSelectorKey: "clNameContains",
                            label: "Name",
                            boundaryClass: "col-4"
                        })
                      ).addField(
                        new FTextFieldMDP({
                            parentMDP: this.childMDP,
                            dataSelectorKey: "clEmailIdContains",
                            label: "Email Id",
                            boundaryClass: "col-4"
                        })
                      ).addField(
                        new FTextFieldMDP({
                            parentMDP: this.childMDP,
                            dataSelectorKey: "clMobileContains",
                            label: "Mobile",
                            boundaryClass: "col-4"
                        })
                      )
                      .addAction(new FBtnMDP({
                        label: "Search",
                        onClick: this.handleFilterclick()
                      }))
          }

          handleFilterclick() {
            return () => {
                this.parent.getDRPDashboardData()
            }
          }
      }
      