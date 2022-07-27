import {ComponentMetaDataProvider, FormChildMetaDataProvider, FormMetaData, ButtonMetaData} from "@/../src-def/form/FormComponentDef";


export class CreditorMetaData implements ComponentMetaDataProvider {
  // FIXED
  componentName = "f-creditor";
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

export class BudgetMetaData implements ComponentMetaDataProvider {
  componentName = "f-budget";

  id: string;
  dataSelectorKey?: string;
  formList: FormMetaData[] = [];
  actionList: ButtonMetaData[] = [];
  parentDataProvider: ComponentMetaDataProvider;

  constructor({
    id,
    dataSelectorKey,
    parentDataProvider,
  }: {
    id: string;
    dataSelectorKey?: string;
    parentDataProvider: ComponentMetaDataProvider;
  }) {
    this.id = id;
    this.parentDataProvider = parentDataProvider;
    this.dataSelectorKey = dataSelectorKey;
  }

  addForm(childForm: FormMetaData) {
    this.formList.push(childForm);
    return this;
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
        formComponentMetaDataList: this.formList.map((form) => form.componentMetaData()),
        actionList: this.actionList.map((action) => action.componentMetaData()),
      },
    };
  }
}

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