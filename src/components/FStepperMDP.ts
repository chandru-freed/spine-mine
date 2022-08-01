import { MDP } from "./MDP";

export default class FStepperMDP implements MDP {
  componentName = "FStepper";
  myRef: string;
  stepMDPList: StepMDP[] = [];

  constructor({ myRef }: { myRef: string }) {
    this.myRef = myRef;
  }

  addStepMDP(name: string, componentMDP: MDP) {
    const stepMDP = new StepMDP({ name: name, componentMDP: componentMDP });
    this.stepMDPList.push(stepMDP);
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRef: this.myRef,
      props: {
        stepMetaDataList: this.stepMDPList.map((mdp) => mdp.getMetaData()),
      },
    };
  }
}

class StepMDP implements MDP {
  name: string;
  componentMDP: MDP;

  constructor({ name, componentMDP }: { name: string; componentMDP: MDP }) {
    this.name = name;
    this.componentMDP = componentMDP;
  }

  getMetaData(): object {
    return {
      props: {
        name: this.name,
        component: this.componentMDP.getMetaData(),
      },
    };
  }
}
