import MDP from "./MDP";

export default class FFooStepperMDP implements MDP {
  componentName = "FFooStepper";

  stepList: FStepMDP[] = [];
  myRefName: string;
  disabled: boolean;

  constructor({ myRefName, disabled=false }: { myRefName: string;disabled?: boolean}) {
    this.myRefName = myRefName;
    this.disabled = disabled;
  }

  addStep({name, stepContent}:{name: string, stepContent: MDP}) {
    this.stepList.push(new FStepMDP({ name: name, stepContent: stepContent }));
    return this;
  }

  isStepEditable() {
    return this.disabled
  }

  getMetaData(): object {
    return {
      myRefName: this.myRefName,
      componentName: this.componentName,
      props: {
        myRefName: this.myRefName,
        stepMetaDataList: this.stepList.map((step) => step.getMetaData()),
        stepsEditable: this.isStepEditable()
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
