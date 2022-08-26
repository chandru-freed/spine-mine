import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import MDP from "@/components/generic/MDP";
import ReceivePaymentFFormMDP from "./nMSFForms/ReceivePaymentFFormMDP";
import SystemDeferredFFormMDP from "./nMSFForms/SystemDeferredFFormMDP";
import FSelectFooFieldMDP from "@/components/generic/form/field/FSelectFooFieldMDP";
import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import ClientDefferedFFormMDP from "./nMSFForms/ClientDefferedFFormMDP";
import ManualTaskIntf from "@/section/spineapp/util/ManualTaskIntf";

export default class NMSFCallStepMDP implements MDP {
  componentName = "NMSFCallStep";
  optionContentMapList: OptionContentMap[] = [];
  myRefName: string = "nmsfCallStepRef";
  taskRoot: ManualTaskIntf;
  parent: any;
  actionList: FBtnMDP[] = [];
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addOption({
      optionName: "System Deffered",
      optionContent: new SystemDeferredFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    })
      .addOption({
        optionName: "Receive Payment",
        optionContent: new ReceivePaymentFFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        }),
      })
      .addOption({
        optionName: "Client Deffered",
        optionContent: new ClientDefferedFFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        }),
      })
      .addAction(
        new FBtnMDP({
          label: "Save",
          onClick: this.validateAndSubmit(),
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Mark Complete",
          onClick: () => {},
          btnType: BtnType.FILLED,
        })
      );
  }

  addOption({
    optionName,
    optionContent,
  }: {
    optionName: string;
    optionContent: MDP;
  }) {
    this.optionContentMapList.push(
      new OptionContentMap({ optionName, optionContent })
    );
    return this;
  }

  addAction(newAction: FBtnMDP) {
    this.actionList.push(newAction);
    return this;
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      props: {
        optionContentMapFSelectMetaData: this.getFSelectMetaData(),
        actionMetaDataList: this.actionList.map((action) =>
          action.getMetaData()
        ),
      },
    };
  }

  getFSelectMetaData() {
    return new FSelectFooFieldMDP({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: "",
      items: this.optionContentMapList.map((optionContentMap) =>
        optionContentMap.getMetaData()
      ),
      label: "Select",
      itemText: "optionName",
      returnObject: true,
      disabled: this.taskRoot.taskDisabled,
    }).getMetaData();
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0];
  }

  validateAndSubmit() {
    return () => {
      const formRefName: string =
        this.getMyRef().selectedOption.optionContent.myRefName;
        console.log(this.getMyRef().$refs[formRefName]);
      this.getMyRef().$refs[formRefName].submitForm(this.saveTask());
    };
  }

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }

  validateAndMarkComplete() {
    return () => {
      this.getMyRef().submitForm(this.saveAndMarkCompleteTask());
    };
  }

  saveAndMarkCompleteTask() {
    return () => {
      this.taskRoot.saveAndMarkCompleteTask();
    };
  }
}

class OptionContentMap implements MDP {
  optionName: string;
  optionContent: MDP;
  constructor({
    optionName,
    optionContent,
  }: {
    optionName: string;
    optionContent: MDP;
  }) {
    this.optionName = optionName;
    this.optionContent = optionContent;
  }

  getMetaData(): object {
    return {
      optionName: this.optionName,
      optionContent: this.optionContent.getMetaData(),
    };
  }
}
