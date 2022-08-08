import MDP from "./MDP";

export default class FStepperMDP implements MDP {
  componentName = "FStepper";

  stepList: FStepMDP[] = [];
  myRef: string;

  constructor({ myRef }: { myRef: string }) {
    this.myRef = myRef;
  }

  addStep(name: string, stepContent: MDP) {
    this.stepList.push(new FStepMDP({ name: name, stepContent: stepContent }));
    return this;
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      props: {
        myRef: this.myRef,
        stepMetaDataList: this.stepList.map((step) => step.getMetaData()),
      },
    };
  }
}

export class FStepMDP implements MDP {
  name: string;
  stepContent: MDP;
  constructor({ name, stepContent }: { name: string; stepContent: MDP }) {
    this.name = name;
    this.stepContent = stepContent;
  }

  getMetaData(): object {
    return {
      stepName: this.name,
      stepContent: this.stepContent.getMetaData(),
    };
  }
}
