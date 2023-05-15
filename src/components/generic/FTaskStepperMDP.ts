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
    preCondition = true,
    preConditionMDP,
    preConditionErrorMsg="Pre condition failed"
  }: {
    name: string;
    stepContent: MDP;
    submitFunc?: (onSuccess: any) => void;
    rescueFunc?: (onSuccess: any) => void;
    preCondition?: boolean;
    preConditionMDP?: MDP;
    preConditionErrorMsg?: string
  }) {
    this.stepList.push(
      new FTaskStepMDP({
        name: name,
        stepContent: stepContent,
        submitFunc,
        rescueFunc,
        preCondition,
        preConditionMDP,
        preConditionErrorMsg
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
  preCondition: boolean;
  preConditionMDP?: MDP;
  preConditionErrorMsg?: string;
  constructor({
    name,
    stepContent,
    submitFunc,
    rescueFunc,
    preCondition=true,
    preConditionMDP,
    preConditionErrorMsg
  }: {
    name: string;
    stepContent: MDP;
    submitFunc?: ((onSuccess: any) => void) | undefined;
    rescueFunc?: ((onSuccess: any) => void) | undefined;
    preCondition?: boolean;
    confirmationMessage?:string;
    preConditionMDP?: MDP;
    preConditionErrorMsg: string;
  }) {
    this.name = name;
    this.stepContent = stepContent;
    this.submitFunc = submitFunc;
    this.rescueFunc = rescueFunc;
    this.preCondition = preCondition;
    this.preConditionMDP = preConditionMDP;
    this.preConditionErrorMsg = preConditionErrorMsg;
  }

  getMetaData(): object {
    return {
      stepName: this.name,
      stepContent: this.stepContent.getMetaData(),
      stepInstance: this.stepContent,
      submitFunc: this.submitFunc,
      rescueFunc: this.rescueFunc,
      preCondition: this.preCondition,
      preConditionMetaData: this.preConditionMDP?.getMetaData(),
      preConditionErrorMsg: this.preConditionErrorMsg
    };
  }
}
