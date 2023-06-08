import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";

import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FTextareaMDP from "@/components/generic/form/field/FTextareaMDP";

export default class DCPCFRejectFileFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  parent: any;
  constructor({ parent }: { parent: any }) {
    super({ myRefName: "dcpCFRequestCancelRef" });
    this.parent = parent;
    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "reason",
        label: "Reason",
        options: reasonCodeList,
        optionLabel: "name",
        optionValue: "id",
        boundaryClass: "col-6",
      })
    )
      .addField(
        new FTextareaMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "reasonDetails",
          label: "Reason Details",
          boundaryClass: "col-6",
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Reject",
          onClick: this.handleRejectFile(),
        })
      );
  }
  handleRejectFile() {
    return () => {
      this.parent.handleRejectFile();
    };
  }
}

const reasonCodeList: any[] = [
  {
    id: "RR_101",
    name: "Unqualified - Debt amount not qualify",
  },

  {
    id: "RR_102",
    name: "Unqualified - Current",
  },

  {
    id: "RR_103",
    name: "Unqualified - Cannot afford the program",
  },
  {
    id: "RR_104",
    name: "Unqualified - Need loan",
  },
  {
    id: "RR_105",
    name: "Wrong Number",
  },
  {
    id: "RR_106",
    name: "Invalid Number",
  },
  {
    id: "RR_107",
    name: "Number Blocked",
  },
  {
    id: "RR_108",
    name: "Others",
  },
  {
    id: "RR_109",
    name: "No loan/Credit card Outstanding",
  },
  {
    id: "RR_110",
    name: "Does not want to impact Credit Score",
  },
  {
    id: "RR_111",
    name: "Not looking for Settlement",
  },

  {
    id: "RR_112",
    name: "Issues with Collection Activities",
  },
  {
    id: "RR_113",
    name: "Move to DCP",
  },
];
