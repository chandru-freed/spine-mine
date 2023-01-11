import MDP from "./MDP";

export default class FTaskStepperMDP implements MDP {
  componentName = "FTaskStepper";

  stepList: FTaskStepMDP[] = [];
  myRefName: string;
  linearProgress: boolean;
  actionable: boolean;

  constructor({
    myRefName,
    linearProgress = false,
    actionable,
  }: {
    myRefName: string;
    linearProgress?: boolean;
    actionable: boolean;
  }) {
    this.myRefName = myRefName;
    this.linearProgress = linearProgress;
    this.actionable = actionable;
  }

  addStep({
    name,
    stepContent,
    submitFunc,
    rescueFunc,
  }: {
    name: string;
    stepContent: MDP;
    submitFunc?: (onSuccess: any) => void;
    rescueFunc?: (onSuccess: any) => void;
  }) {
    this.stepList.push(
      new FTaskStepMDP({
        name: name,
        stepContent: stepContent,
        submitFunc,
        rescueFunc,
      })
    );
    return this;
  }

  getMetaData(): object {
    return {
      myRefName: this.myRefName,
      componentName: this.componentName,
      props: {
        myRefName: this.myRefName,
        linearProgress: this.linearProgress,
        actionable: this.actionable,
        stepMetaDataList: this.stepList.map((step) => step.getMetaData()),
      },
    };
  }
}

export class FTaskStepMDP implements MDP {
  name: string;
  stepContent: MDP;
  submitFunc: ((onSuccess: any) => void) | undefined;
  rescueFunc: ((onSuccess: any) => void) | undefined;
  constructor({
    name,
    stepContent,
    submitFunc,
    rescueFunc,
  }: {
    name: string;
    stepContent: MDP;
    submitFunc?: ((onSuccess: any) => void) | undefined;
    rescueFunc?: ((onSuccess: any) => void) | undefined;
  }) {
    this.name = name;
    this.stepContent = stepContent;
    this.submitFunc = submitFunc;
    this.rescueFunc = rescueFunc;
  }

  getMetaData(): object {
    return {
      stepName: this.name,
      stepContent: this.stepContent.getMetaData(),
      stepInstance: this.stepContent,
      submitFunc: this.submitFunc,
      rescueFunc: this.rescueFunc,
    };
  }
}
