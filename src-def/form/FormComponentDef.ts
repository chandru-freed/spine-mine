// Decision

import CollectClientInfoTaskInf from "@/section/spineapp/components/task/enrollment/CollectClientInfoTaskInf";
import FCreditorInf from "@/section/spineapp/components/task/enrollment/components/FCreditorInf";

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
        component: this.component.componentMetaData(),
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
  placeholder: string;
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
    placeholder = "",
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
    placeholder?: string;
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
    this.placeholder = placeholder;
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

export class TextareaMetaData implements FieldMetaData {
  // FIXED
  componentName = "f-textarea";
  // MANDATORY
  id: string;
  dataSelectorKey: string;
  label: string;
  // OPTIONAL with Default
  rules: string;
  colWidth: number;
  mandatory: boolean;
  disabled: boolean;
  placeholder: string;
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
    placeholder = "",
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
    placeholder?: string;
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
    this.placeholder = placeholder;
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

export class SelectFieldMetaData implements FieldMetaData {
  // FIXED
  componentName = "f-select";
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
  options: any[];

  constructor({
    parentDataProvider,
    id,
    dataSelectorKey,
    label,
    rules = "",
    colWidth = 12,
    mandatory = false,
    disabled = false,
    mask = "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
    options = [],
  }: {
    parentDataProvider: FormChildMetaDataProvider;
    id?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory?: boolean;
    disabled?: boolean;
    mask?: string;
    onChange?: () => void;
    options: any[];
  }) {
    this.parentDataProvider = parentDataProvider;
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory;
    this.disabled = disabled;
    this.mask = mask;
    this.onChange = onChange;
    this.options = options;
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
        mask: this.mask,
        onChange: this.onChange,
        items: this.options,
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
  minHeight: number;

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
    minHeight = 10,
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
    minHeight?: number;
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
    this.minHeight = minHeight;
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
        minHeight: this.minHeight,
        onChange: this.onChange,
      },
    };
  }
}

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

export class CreditorMetaData implements ComponentMetaDataProvider {
  root: CollectClientInfoTaskInf;
  fCreditor: FCreditorInf;
  // FIXED
  componentName = "f-creditor";
  componentRef = "creditorRef";

  // MANDATORY
  id: string;
  // OPTIONAL
  dataSelectorKey?: string;
  // OPTIONAL with Default
  disabled: boolean;
  actionList: ButtonMetaData[] = [];
  onChange: () => void;

  constructor({
    root,
    id,
    dataSelectorKey,
    disabled = false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
  }: {
    root: CollectClientInfoTaskInf,
    id: string;
    dataSelectorKey?: string;
    disabled?: boolean;
    onChange?: () => void;
  }) {
    this.root = root;
    this.id = id;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled;
    this.onChange = onChange;
  }

  addAction(action: ButtonMetaData) {
    this.actionList.push(action);
  }

  addFormRefStr = "addCreditorFormRef";

  getAddFormRef() {
    console.log(this.root.$refs);
    console.log(this.root.$refs[this.root.rootRef]);
    return (this.root.$refs[this.root.rootRef]! as any).$refs[
      this.componentRef
    ][0];
  }

  addCreditorFunc = () => {
    this.getAddFormRef().onSubmit((form: any) => {
      this.fCreditor.addCreditor();
    });
  };

  componentMetaData(): object {
    const addFormMetaData = this.getAddCreditorFormMetaData();
    const editFormMetaData = this.getEditCreditorFormMetaData();
    return {
      ref: this.componentRef,
      componentName: this.componentName,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        id: this.id,
        key: this.dataSelectorKey,
        disabled: this.disabled,
        addCreditorFormComponentMetaData: addFormMetaData.componentMetaData(),
        editCreditorFormComponentMetaData: editFormMetaData.componentMetaData(),
        actionComponentMetaDataList: this.actionList.map(
          (comp: ButtonMetaData) => comp.componentMetaData()
        ),
        onChange: this.onChange,
      },
    };
  }

  getAddCreditorFormMetaData(): FormMetaData {
    const addCreditorFormMetaData = new FormMetaData({
      id: "addCreditorForm",
      formRef: this.addFormRefStr,
      dataSelectorKey: "addCreditorForm",
    });

    addCreditorFormMetaData
      .addField(
        new TextFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "creditor",
          label: "Creditor",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "creditorBalance",
          label: "Creditor Balance",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "lastDateOfPayment",
          label: "Last Date Of Payment",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
          mask: "##/##/####",
          placeholder: "dd/mm/yyyy",
        })
      )
      .addField(
        new SelectFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "debtType",
          label: "Debt Type",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
          options: ["Credit Card", "Personal Loans", "Secured", "Others"],
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
        })
      )
      .addOtherChild(
        new ButtonMetaData({
          id: "addCreditorBtn",
          label: "Cancel",
          outlined: true,
          onClick: this.addCreditorFunc, // TODO : How to call with validation.
        })
      );

    return addCreditorFormMetaData;
  }

  getEditCreditorFormMetaData(): FormMetaData {
    const formRefStr = "editCreaditorFormRef";
    const editCreditorFormMetaData = new FormMetaData({
      id: "editCreditorForm",
      formRef: formRefStr,
      dataSelectorKey: "editCreditorForm",
    });

    editCreditorFormMetaData
      .addField(
        new TextFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "creditor",
          label: "Creditor",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "creditorBalance",
          label: "Creditor Balance",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "lastDateOfPayment",
          label: "Last Date Of Payment",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
        })
      )
      .addField(
        new SelectFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "debtType",
          label: "Debt Type",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
          options: ["Credit Card", "Personal Loans", "Secured", "Others"],
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
        })
      );
    return editCreditorFormMetaData;
  }
}

export class BudgetMetaData implements ComponentMetaDataProvider {
  componentName = "f-budget";

  id: string;
  dataSelectorKey?: string;
  formMetaData: FormMetaData;
  actionList: ButtonMetaData[] = [];
  disabled: boolean;

  constructor({
    id,
    dataSelectorKey,
    formMetaData,
    disabled = false,
  }: {
    id: string;
    dataSelectorKey?: string;
    formMetaData: FormMetaData;
    disabled: boolean;
  }) {
    this.id = id;
    this.dataSelectorKey = dataSelectorKey;
    this.formMetaData = formMetaData;
    this.disabled = disabled;
  }

  addAction(child: ButtonMetaData) {
    this.actionList.push(child);
    return this;
  }

  componentMetaData(): object {
    return {
      componentName: this.componentName,
      id: this.id,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        id: this.id,
        formComponentMetaData: this.formMetaData.componentMetaData(),
        actionList: this.actionList.map((action) => action.componentMetaData()),
        disabled: this.disabled,
      },
    };
  }
}

/*
export class DocumentMetaData implements ComponentMetaDataProvider {
  // FIXED
  componentName = "f-document";
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

export class PaymentPlanMetaData implements ComponentMetaDataProvider {
  componentName = "f-payment-plan";

  id: string;
  dataSelectorKey?: string;
  actionList: ButtonMetaData[] = [];
  form: FormMetaData;
  parentDataProvider: ComponentMetaDataProvider;

  constructor({
    id,
    dataSelectorKey,
    parentDataProvider,
    form,
  }: {
    id: string;
    dataSelectorKey?: string;
    parentDataProvider: ComponentMetaDataProvider;
    form: FormMetaData;
  }) {
    this.id = id;
    this.parentDataProvider = parentDataProvider;
    this.dataSelectorKey = dataSelectorKey;
    this.form = form;
  }

  addAction(child: ButtonMetaData) {
    this.actionList.push(child);
    return this;
  }

  componentMetaData(): object {
    return {
      componentName: this.componentName,
      parentDataProvider: this.parentDataProvider,
      id: this.id,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        id: this.id,
        formComponentMetaData: this.form.componentMetaData(),
        actionList: this.actionList.map((action) => action.componentMetaData()),
      },
    };
  }
}
*/
