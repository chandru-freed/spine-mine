import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import MDP from "@/components/generic/MDP";
import ReceivePaymentFFormMDP from "./nMSFForms/ReceivePaymentFFormMDP";
import SystemDeferredFFormMDP from "./nMSFForms/SystemDeferredFFormMDP";
import FSelectFooFieldMDP from "@/components/generic/form/field/FSelectFooFieldMDP"

export default class NMSFCallStepMDP implements MDP {
  componentName = "NMSFCallStep";
  optionContentMapList: OptionContentMap[] = [];
  myRefName: string = "nmsfCallStepRef";
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addOption({
      optionName: "System Deffered",
      optionContent: new SystemDeferredFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    }).addOption({
      optionName: "Receive Payment",
      optionContent: new ReceivePaymentFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    });
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

  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      props: {
        optionContentMapFSelectMetaData: this.getFSelectMetaData()
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
        itemText:"optionName",
        returnObject: true,
        disabled: this.taskRoot.taskDisabled
    }).getMetaData();
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
