// Decision

/*
Where metadata can come from
- HardCode in Field
- Taken always from Parent
- Mandatory - Take it from user
- Optional - Take it from user ||  default in Field
- Optional - Take it from user ||  default from Parent
- Field can be composite - logic in design time
- All data coming from user can be static in config or dynamic as computed
- including events everythign comes with the part of props
*/



export class Stepper {
  stepperRef: string;
  stepList: Step[];

  constructor({
    stepperRef,
    stepList,
  }: {
    stepperRef: string;
    stepList: Step[];
  }) {
    this.stepperRef = stepperRef;
    this.stepList = stepList;
  }
}

export class Step {
  id: string;
  name: string;
  formList: Form[] = [];

  constructor({
    id,
    name,
  }: // formList,
  {
    id: string;
    name: string;
    // formList: Form[];
  }) {
    this.id = id;
    this.name = name;
    // this.formList = formList;
  }

  addForm(form: Form) {
    this.formList.push(form);
  }

  componentData() {
    return {
      props: {
        id: this.id,
        name: this.name,
        formList: this.formList.map((form: Form) => form.componentData()),
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

export interface Field extends ComponentDataProvider {
  dataSelectorKey: string;
  rules: string;
  label: string;
}

export class FormChildDataProvider {
  dense = true;
  padding = "px-2";
}

export class Form
  extends FormChildDataProvider
  implements ComponentDataProvider
{
  componentName = "f-form";

  id: string;
  formRef: string;

  dataSelectorKey?: string;
  disabled: boolean;
  fieldList: Field[] = [];
  otherChildren: ComponentDataProvider[] = [];

  constructor({
    id,
    formRef,
    dataSelectorKey,
    disabled = false,
  }: {
    id: string;
    formRef: string;
    dataSelectorKey?: string;
    disabled?: boolean;
  }) {
    super(); // pass any FormChildDataProvider field if needs to be passed from user and set it in super
    this.id = id;
    this.formRef = formRef;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled;
  }

  addField(field: Field) {
    this.fieldList.push(field);
    return this;
  }

  addOtherChild(child: ComponentDataProvider) {
    this.otherChildren.push(child);
    return this;
  }

  componentData(): object {
    return {
      componentName: this.componentName,
      id: this.id,
      formRef: this.formRef,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        id: this.id,
        formRef: this.formRef,
        name: this.formRef,
        fieldList: this.fieldList.map((comp: Field) => comp.componentData()),
        otherChildren: this.otherChildren.map((comp: ComponentDataProvider) =>
          comp.componentData()
        ),
        disabled: this.disabled,
      },
    };
  }
}

export class TextField implements Field {
  // FIXED
  componentName = "v-text-field";
  type = "text";
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
  parentDataProvider: FormChildDataProvider;

  constructor({
    parentDataProvider,
    id,
    dataSelectorKey,
    label,
    rules = "",
    colWidth = 12,
    mandatory = false,
    disabled = false,
    onInput = undefined,
  }: {
    parentDataProvider: FormChildDataProvider;
    id?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    onInput?: () => void;
  }) {
    this.parentDataProvider = parentDataProvider;
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
    return `col-${this.colWidth} ${this.parentDataProvider.padding}`;
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
        dense: this.parentDataProvider.dense,
      },
      on: {
        input: this.onInput,
      },
    };
  }
}

export class EmailField extends TextField {
  constructor({
    parentDataProvider,
    id,
    dataSelectorKey,
    label,
    rules = "",
    colWidth,
    mandatory,
    disabled,
    onInput,
  }: {
    parentDataProvider: FormChildDataProvider;
    id?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    onInput?: () => void;
  }) {
    super({
      parentDataProvider: parentDataProvider,
      id: id,
      dataSelectorKey: dataSelectorKey,
      label: label,
      rules: `email|${rules}`,
      colWidth: colWidth,
      mandatory: mandatory,
      disabled: disabled,
      onInput: onInput,
    });
  }
}

// todo: add boundary class like field
export class Button implements ComponentDataProvider {
  // FIXED
  componentName = "f-btn";
  padding = "px-2"; //todo: needs to come from form
  // MANDATORY
  id: string;
  label: string;
  // OPTIONAL with Default
  colWidth: number;
  disabled: boolean;
  outlined: boolean;
  color: string;
  onClick: () => void;

  constructor({
    id,
    label,
    disabled = false,
    outlined = false,
    color = "primary",
    onClick,
  }: {
    id: string;
    label: string;
    disabled?: boolean;
    outlined?: boolean;
    color?: string;
    onClick: () => void;
  }) {
    this.id = id;
    this.label = label;
    this.disabled = disabled;
    this.outlined = outlined;
    this.color = color;
    this.onClick = onClick;
  }

  getBoundaryClass() {
    return `col-${this.colWidth} text-center`;
  }

  componentData(): object {
    return {
      componentName: this.componentName,
      boundaryClass: this.getBoundaryClass(),
      props: {
        label: this.label,
        disabled: this.disabled,
        outlined: this.outlined,
        color: this.color,
        onClick: this.onClick,
      },
    };
  }
}
