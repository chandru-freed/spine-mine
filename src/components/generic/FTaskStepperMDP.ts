import MDP from "./MDP";

export default class FTaskStepperMDP implements MDP {
  componentName = "FTaskStepper";

  stepList: FTaskStepMDP[] = [];
  myRefName: string;
  linearProgress: boolean;

  constructor({ myRefName, linearProgress=false }: { myRefName: string;linearProgress?: boolean}) {
    this.myRefName = myRefName;
    this.linearProgress = linearProgress;
  }

  addStep({name, stepContent,submitFunc}:{name: string, stepContent: MDP,submitFunc?: (onSuccess: any) => void}) {
    this.stepList.push(new FTaskStepMDP({ name: name, stepContent: stepContent, submitFunc }));
    return this;
  }

  getMetaData(): object {
    return {
      myRefName: this.myRefName,
      componentName: this.componentName,
      props: {
        myRefName: this.myRefName,
        linearProgress: this.linearProgress,
        stepMetaDataList: this.stepList.map((step) => step.getMetaData()),
      },
    };
  }
}

export class FTaskStepMDP implements MDP {
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
