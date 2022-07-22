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



export class StepperMetaData {
  stepperRef: string;
  stepMetaDataList: StepMetaData[];

  constructor({
    stepperRef,
    stepMetaDataList = [],
  }: {
    stepperRef: string;
    stepMetaDataList: StepMetaData[];
  }) {
    this.stepperRef = stepperRef;
    this.stepMetaDataList = stepMetaDataList;
  }
}

export class StepMetaData {
  id: string;
  name: string;
  formList: FormMetaData[] = [];

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

  addForm(form: FormMetaData) {
    this.formList.push(form);
  }

  componentMetaData() {
    return {
      props: {
        id: this.id,
        name: this.name,
        formList: this.formList.map((form: FormMetaData) => form.componentMetaData()),
      },
    };
  }
}

//-------------------------------------------------------------------------------------------------------------------

export interface ComponentMetaDataProvider {
  id: string;
  componentName: string;
  componentMetaData(): object; // todo: change it to getComponentData
}

export interface FieldMetaData extends ComponentMetaDataProvider {
  dataSelectorKey: string;
  rules: string;
  label: string;
}

export class FormChildMetaDataProvider {
  dense = true;
  padding = "px-2";
}

export class FormMetaData
  extends FormChildMetaDataProvider
  implements ComponentMetaDataProvider
{
  componentName = "f-form";

  id: string;
  formRef: string;

  dataSelectorKey?: string;
  disabled: boolean;
  fieldList: FieldMetaData[] = [];
  otherChildren: ComponentMetaDataProvider[] = [];

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
    super(); // pass any FormChildMetaDataProvider field if needs to be passed from user and set it in super
    this.id = id;
    this.formRef = formRef;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled;
  }

  addField(field: FieldMetaData) {
    this.fieldList.push(field);
    return this;
  }

  addOtherChild(child: ComponentMetaDataProvider) {
    this.otherChildren.push(child);
    return this;
  }

  componentMetaData(): object {
    return {
      componentName: this.componentName,
      id: this.id,
      formRef: this.formRef,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        id: this.id,
        formRef: this.formRef,
        name: this.formRef,
        fieldList: this.fieldList.map((comp: FieldMetaData) => comp.componentMetaData()),
        otherChildren: this.otherChildren.map((comp: ComponentMetaDataProvider) =>
          comp.componentMetaData()
        ),
        disabled: this.disabled,
      },
    };
  }
}

export class TextFieldMetaData implements FieldMetaData {
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
  parentDataProvider: FormChildMetaDataProvider;

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
    parentDataProvider: FormChildMetaDataProvider;
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
  componentMetaData(): object {
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

export class EmailFieldMetaData extends TextFieldMetaData {
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
    parentDataProvider: FormChildMetaDataProvider;
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
export class ButtonMetaData implements ComponentMetaDataProvider {
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

  componentMetaData(): object {
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
