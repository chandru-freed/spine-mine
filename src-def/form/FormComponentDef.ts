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

export class StepMetaData  {
  id: string;
  name: string;
  component: ComponentMetaDataProvider;

  constructor({
    id,
    name,
    component,
  }: {
    id: string;
    name: string;
    component: ComponentMetaDataProvider;
  }) {
    this.id = id;
    this.name = name;
    this.component = component;
  }

 
  componentMetaData() {
    return {
      props: {
        id: this.id,
        name: this.name,
        component: this.component,
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
  outlined = true;
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
        fieldList: this.fieldList.map((comp: FieldMetaData) =>
          comp.componentMetaData()
        ),
        otherChildren: this.otherChildren.map(
          (comp: ComponentMetaDataProvider) => comp.componentMetaData()
        ),
        disabled: this.disabled,
      },
    };
  }
}

export class TextFieldMetaData implements FieldMetaData {
  // FIXED
  componentName = "f-text-field";
  type: string; // = "text";
  // MANDATORY
  id: string;
  dataSelectorKey: string;
  label: string;
  // OPTIONAL with Default
  rules: string;
  colWidth: number;
  mandatory: boolean;
  disabled: boolean;
  mask: string;
  onChange: () => void;
  parentDataProvider: FormChildMetaDataProvider;

  constructor({
    parentDataProvider,
    id,
    dataSelectorKey,
    type = "text",
    label,
    rules = "",
    colWidth = 12,
    mandatory = false,
    disabled = false,
    mask = "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
  }: {
    parentDataProvider: FormChildMetaDataProvider;
    id?: string;
    dataSelectorKey: string;
    type?: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    mask?: string;
    onChange?: () => void;
  }) {
    this.parentDataProvider = parentDataProvider;
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    this.type = type;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory;
    this.disabled = disabled;
    this.mask = mask;
    this.onChange = onChange;
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
        disabled: this.disabled,
        outlined: this.parentDataProvider.outlined,
        dense: this.parentDataProvider.dense,
        mask: this.mask,
        onChange: this.onChange,
      },
    };
  }
}

export class NumberFieldMetaData implements FieldMetaData {
  // FIXED
  componentName = "f-number-field";
  type = "number"; // = "text";
  // MANDATORY
  id: string;
  dataSelectorKey: string;
  label: string;
  // OPTIONAL with Default
  rules: string;
  colWidth: number;
  mandatory: boolean;
  disabled: boolean;
  mask: string;
  onChange: () => void;
  parentDataProvider: FormChildMetaDataProvider;

  constructor({
    parentDataProvider,
    id,
    dataSelectorKey,
    // type = "number",
    label,
    rules = "",
    colWidth = 12,
    mandatory = false,
    disabled = false,
    mask = "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
  }: {
    parentDataProvider: FormChildMetaDataProvider;
    id?: string;
    dataSelectorKey: string;
    // type?: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    mask?: string;
    onChange?: () => void;
  }) {
    this.parentDataProvider = parentDataProvider;
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    // this.type = type;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory;
    this.disabled = disabled;
    this.mask = mask;
    this.onChange = onChange;
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
        disabled: this.disabled,
        outlined: this.parentDataProvider.outlined,
        dense: this.parentDataProvider.dense,
        mask: this.mask,
        onChange: this.onChange,
      },
    };
  }
}

export class EmailFieldMetaData extends TextFieldMetaData {
  constructor({
    parentDataProvider,
    id,
    type,
    dataSelectorKey,
    label,
    rules = "",
    colWidth,
    mandatory,
    disabled,
    mask,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
  }: {
    parentDataProvider: FormChildMetaDataProvider;
    id?: string;
    type?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    mask?: string;
    onChange?: () => void;
  }) {
    super({
      parentDataProvider: parentDataProvider,
      id: id,
      type: type,
      dataSelectorKey: dataSelectorKey,
      label: label,
      rules: `email|${rules}`,
      colWidth: colWidth,
      mandatory: mandatory,
      disabled: disabled,
      mask: mask,
      onChange: onChange,
    });
  }
}

export class SwitchMetaData implements FieldMetaData {
  // FIXED
  componentName = "f-switch";
  inset = true;
  // MANDATORY
  id: string;
  dataSelectorKey: string;
  label: string;
  // OPTIONAL with Default
  rules: string;
  colWidth: number;
  mandatory: boolean;
  disabled: boolean;
  onChange: () => void;
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
  }: {
    parentDataProvider: FormChildMetaDataProvider;
    id?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    onChange?: () => void;
  }) {
    this.parentDataProvider = parentDataProvider;
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory;
    this.disabled = disabled;
    this.onChange = onChange;
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
        name: this.dataSelectorKey, // todo: check the name functionalities
        label: this.label,
        disabled: this.disabled,
        inset: this.inset,
        outlined: this.parentDataProvider.outlined,
        dense: this.parentDataProvider.dense,
        onChange: this.onChange,
      },
    };
  }
}

export class AddressMetaData implements ComponentMetaDataProvider {
  // FIXED
  componentName = "f-address";
  // MANDATORY
  id: string;
  dataSelectorKey: string;
  label: string;
  // OPTIONAL with Default
  rules: string;
  colWidth: number;
  mandatory: boolean;
  disabled: boolean;
  onChange: () => void;
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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
  }: {
    parentDataProvider: FormChildMetaDataProvider;
    id?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    onChange?: () => void;
  }) {
    this.parentDataProvider = parentDataProvider;
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory;
    this.disabled = disabled;
    this.onChange = onChange;
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
        name: this.dataSelectorKey, // todo: check the name functionalities
        label: this.label,
        disabled: this.disabled,
        outlined: this.parentDataProvider.outlined,
        dense: this.parentDataProvider.dense,
        onChange: this.onChange,
      },
    };
  }
}

export class MiniFormMetaData implements FieldMetaData {
  // FIXED
  componentName; // = "f-mini-form";
  // MANDATORY
  id: string;
  dataSelectorKey: string;
  label: string;
  // OPTIONAL with Default
  rules: string;
  colWidth: number;
  mandatory: boolean;
  disabled: boolean;
  onChange: () => void;
  parentDataProvider: FormChildMetaDataProvider;
  fieldList: FieldMetaData[] = [];

  constructor({
    componentName = "f-mini-form",
    parentDataProvider,
    id,
    dataSelectorKey,
    label,
    rules = "",
    colWidth = 12,
    mandatory = false,
    disabled = false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
  }: {
    componentName?: string;
    parentDataProvider: FormChildMetaDataProvider;
    id?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    onChange?: () => void;
  }) {
    this.componentName = componentName;
    this.parentDataProvider = parentDataProvider;
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory;
    this.disabled = disabled;
    this.onChange = onChange;
  }

  addField(field: FieldMetaData) {
    this.fieldList.push(field);
    return this;
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
        name: this.dataSelectorKey, // todo: check the name functionalities
        fieldList: this.fieldList.map((comp: FieldMetaData) =>
          comp.componentMetaData()
        ),
        label: this.label,
        disabled: this.disabled,
        outlined: this.parentDataProvider.outlined,
        dense: this.parentDataProvider.dense,
        onChange: this.onChange,
      },
    };
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
