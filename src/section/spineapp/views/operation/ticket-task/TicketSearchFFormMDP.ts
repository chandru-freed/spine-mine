import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import * as Data from "@/../src-gen/data";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FBtnMDP from "@/components/generic/FBtnMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FGompaUserRemoteAutoCompleteFieldMDP from "@/components/generic/form/field/FGompaUserRemoteAutoCompleteMDP";

export default class TicketSearchFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ myRefName: "TicketSearchRef" });
    this.parent = parent;
    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "ticketNumber",
        label: "Ticket Number",
        boundaryClass: "col-4",
      })
    )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "ticketState",
          label: "Ticket State",

          options: Data.Spine.TicketStatus.list(),

          boundaryClass: "col-4",
          optionLabel: "name",
          optionValue: "id",
          multiple: true,
          clearable: true,
        })
      )
      .addField(
        new FGompaUserRemoteAutoCompleteFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "assignedTo",
          label: "Assigned To",
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FGompaUserRemoteAutoCompleteFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "raisedBy",
          label: "Raised By",
          boundaryClass: "col-4",
        })
      )
      .addField(
        new FSelectFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "isAllocated",
          label: "Is Allocated",
          boundaryClass: "col-4",
          options: allocatedToOptions,
          clearable: true,
          optionLabel: "name",
          optionValue: "id",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Search",
          onClick: () => {
            this.parent.searchTicket();
          },
        })
      );
  }
}

const allocatedToOptions = [
  {
    name: "Yes",
    id: true,
  },
  {
    name: "No",
    id: false,
  },
];
