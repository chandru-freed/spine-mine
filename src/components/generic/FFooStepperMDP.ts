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

  addStep({name, stepContent,submitFunc}:{name: string, stepContent: MDP,submitFunc?: (onSuccess: any) => void}) {
    this.stepList.push(new FStepMDP({ name: name, stepContent: stepContent, submitFunc }));
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
  submitFunc: ((onSuccess: any) => void) | undefined;
  constructor({ name, stepContent,submitFunc }: { name: string; stepContent: MDP, submitFunc?: ((onSuccess: any) => void) | undefined }) {
    this.name = name;
    this.stepContent = stepContent;
    this.submitFunc = submitFunc;
  }

  getMetaData(): object {
    return {
      stepName: this.name,
      stepContent: this.stepContent.getMetaData(),
      stepInstance: this.stepContent,
      submitFunc: this.submitFunc
    };
  }
}
