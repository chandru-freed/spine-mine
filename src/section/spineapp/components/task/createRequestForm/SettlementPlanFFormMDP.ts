import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FUploadFileFieldForCFMDP from "@/components/generic/form/field/FUploadFileFieldForCFMDP";

export default class SettlementPlanFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      myRefName: "settlementPlanFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FSelectFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "createSettlementPlanInput.fiCreditorId",
        label: "Creditor",
        mandatory: true,
        boundaryClass: "col-6",
        options: this.taskRoot.fiCreditorInfo?.creditorList,
        optionLabel: "creditorName",
        optionValue: "fiCreditorId"
      })
    )
      .addField(new FCurrencyFieldMDP(
        {
          parentMDP: this.childMDP,
          dataSelectorKey: "createSettlementPlanInput.totalOutstandingAmount",
          label: "total Outstanding Amount",
          mandatory: true,
          boundaryClass: "col-6",
          disabled:true,
        },
      ))

      .addField(new FCurrencyFieldMDP(
        {
          parentMDP: this.childMDP,
          dataSelectorKey: "createSettlementPlanInput.settlementAmount",
          label: "Settlement Amount",
          mandatory: true,
          boundaryClass: "col-6",
        },
      ))
      .addField(new FUploadFileFieldForCFMDP(
        {
          parentMDP: this.childMDP,
          dataSelectorKey: "createSettlementPlanInput.bankSifDoc",
          label: "Document",
          mandatory: true,
          boundaryClass: "col-6",
        },
      ))
      .
      addAction(
        new FBtnMDP({
          label: "CREATE REQUEST",
          onClick: this.validateAndSubmit(),
        })
      );
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  validateAndSubmit() {
    return () => {
      this.getMyRef().submitForm(this.createSettlementPlan());
    };
  }

  createSettlementPlan() {
    return () => {
      this.taskRoot.createSettlementPlan();
    };
  }
}
