// Decision

/*
Where data can come from
- HardCode in Field
- Taken always from Parent
- Mandatory - Take it from user
- Optional - Take it from user ||  default in Field
- Optional - Take it from user ||  default from Parent
- Field can be composite - logic in design time
- All data coming from user can be static in config or dynamic as computed
- including events everythign comes with the part of props



*/

// TODO
/*
1. FormField 2 class - boundaryClass / fieldClass
2. only boundary Class is used and not in fieldClass
3. FForm - modelId repalce with vModelSelector as string?
4. empty string replace with optional string
5. each component - design mandatory and optional backed by default value with object as a param
6. For every task component - each step willhave ts file with <TaskComponentName>Step1
7. FForm replace boundary class with formClass and inlineClass in the component
8. ant componentDat which I am using in move it outside and only the props attribute to stay inside props
*/

export class Stepper {
  ref: string;
  stepList: Step[];

  constructor(ref: string, stepList: Step[]) {
    this.ref = ref;
    this.stepList = stepList.map((step) => step);
  }
}

export class Step {
  id: string;
  name: string;
  componentList: any[];

  constructor(id: string, name: string, componentList: any[]) {
    this.id = id;
    this.name = name;
    this.componentList = componentList;
  }

  componentData() {
    return {
      props: {
        id: this.id,
        name: this.name,
        componentList: this.componentList.map((comp: any) =>
          comp.componentData()
        ),
      },
    };
  }
}

//-------------------------------------------------------------------------------------------------------------------

export interface ComponentDataProvider {
  id: string;
  componentName: string;
  componentData(): object; // todo: change it to getComponentData
}

export interface FormComponentDataProvider extends ComponentDataProvider {
  dataSelectorKey: string;
  rules: string;
}

export class Form implements ComponentDataProvider {
  componentName = "f-form";

  id: string;
  formRef: string;

  modelId?: string;
  disabled: boolean;
  children: ComponentDataProvider[];

  constructor({
    id,
    formRef,
    modelId,
    disabled = false,
    children = [],
  }: {
    id: string;
    formRef: string;
    modelId?: string;
    disabled?: boolean;
    children: ComponentDataProvider[]; // todo : seprate as 2 ComponentDataProvider and FormComponentDataProvider
  }) {
    this.id = id;
    this.formRef = formRef;
    this.modelId = modelId;
    this.disabled = disabled;
    this.children = children;
  }

  componentData(): object {
    return {
      componentName: this.componentName,
      id: this.id,
      formRef: this.formRef,
      modelId: this.modelId,
      props: {
        id: this.id,
        formRef: this.formRef,
        name: this.formRef,
        children: this.children.map((comp: any) => comp.componentData()),
        disabled: this.disabled,
      },
    };
  }
}

export class TextField implements FormComponentDataProvider {
  // FIXED
  componentName = "v-text-field";
  type = "text";
  padding = "px-2";
  // MANDATORY
  id: string;
  dataSelectorKey: string;
  label: string;
  // OPTIONAL with Default
  rules: string;
  colWidth: number;
  mandatory: boolean;
  disabled: boolean;
  onInput: (() => void) | undefined;

  constructor({
    id,
    dataSelectorKey,
    label,
    rules = "",
    colWidth = 12,
    mandatory = false,
    disabled = false,
    onInput = undefined,
  }: {
    id?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    onInput?: () => void;
  }) {
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory;
    this.disabled = disabled;
    this.onInput = onInput;
  }

  getBoundaryClass() {
    return `col-${this.colWidth} ${this.padding}`;
  }

  getRules() {
    const mandarotyStr = this.mandatory ? "required" : "";
    return `${mandarotyStr}|${this.rules}`;
  }
  componentData(): object {
    return {
      componentName: this.componentName,
      rules: this.getRules(),
      boundaryClass: this.getBoundaryClass(),
      props: {
        key: this.dataSelectorKey,
        type: this.type,
        name: this.dataSelectorKey, // todo: check the name functionalities
        label: this.label,
        outlined: true, // todo: remove this also
        disabled: this.disabled,
      },
      on: {
        input: this.onInput,
      },
    };
  }
}

export class Button implements ComponentDataProvider {
  // FIXED
  componentName = "f-btn";
  // MANDATORY
  id: string;
  label: string;
  // OPTIONAL with Default
  disabled: boolean;
  onClick: () => void;

  constructor({
    id,
    label,
    disabled = false,
    onClick,
  }: {
    id: string;
    label: string;
    disabled?: boolean;
    onClick: () => void;
  }) {
    this.id = id;
    this.label = label;
    this.disabled = disabled;
    this.onClick = onClick;
  }

  componentData(): object {
    return {
      componentName: this.componentName,
      rules: "", // to be removed
      props: {
        key: "", // to be removed
        label: this.label,
        outlined: true, // todo: remove this also
        disabled: this.disabled,
        onClick: this.onClick,
      },
    };
  }
}
