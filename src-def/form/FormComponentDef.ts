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

const FIELD_CLASS_COL = " col-12 ";
const FIELD_CLASS_MARGIN = " px-2 ";

export class Field {
  id: string;
  formClass = "col-12";

  constructor(id: string, formClass: string) {
    this.id = id || new Date().toString();
    this.formClass = formClass + FIELD_CLASS_MARGIN;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TextField extends Field {
  key: string; // id ?
  componentName = "v-text-field";
  type = "text";
  label: string;
  rules: string; // validation

  constructor(
    key: string,
    label: string,
    rules: string,
    formClass = FIELD_CLASS_COL
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.rules = rules;
  }

  componentData() {
    return {
      componentName: this.componentName,
      rules: this.rules,
      props: {
        key: this.key,
        type: this.type,
        name: this.key,
        label: this.label,
        outlined: true,
        formClass: this.formClass,
      },
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class EmailField extends Field {
  key: string;
  type = "text";
  componentName = "v-text-field";
  label: string;
  rules: string;
  placeholder?: string;
  hint?: string;

  constructor(
    key: string,
    label: string,
    rules: string,
    placeholder?: string,
    hint?: string,
    formClass = FIELD_CLASS_COL
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.rules = rules;
    this.placeholder = placeholder;
    this.hint = hint;
  }

  componentData() {
    return {
      componentName: this.componentName,
      rules: this.rules,
      props: {
        type: this.type,
        key: this.key,
        name: this.key,
        label: this.label,
        // rules: this.rules,
        outlined: true,
        placeholder: this.placeholder,
        hint: this.hint,
        formClass: this.formClass,
      },
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TextareaField extends Field {
  key: string;
  type = "text";
  componentName = "v-textarea";
  label: string;
  rules: string;
  placeholder?: string;
  hint?: string;

  constructor(
    key: string,
    label: string,
    rules: string,
    placeholder?: string,
    hint?: string,
    formClass = FIELD_CLASS_COL
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.rules = rules;
    this.placeholder = placeholder;
    this.hint = hint;
  }

  componentData() {
    return {
      componentName: this.componentName,
      rules: this.rules,
      props: {
        type: this.type,
        key: this.key,
        name: this.key,
        label: this.label,
        // rules: this.rules,
        outlined: true,
        placeholder: this.placeholder,
        hint: this.hint,
        formClass: this.formClass,
      },
    };
  }
}

export class SelectField extends Field {
  key: string;
  componentName = "v-select";
  label: string;
  rules: string;
  options: string[];
  onChange: (() => void) | undefined
  onInput: (() => void) | undefined

  constructor(
    key: string,
    label: string,
    rules: string,
    options: string[],
    formClass = FIELD_CLASS_COL,
    onChange?: () => void,
    onInput?: () => void
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.rules = rules;
    this.options = options;
    this.onChange = onChange;
    this.onInput = onInput
  }

  componentData() {
    return {
      componentName: this.componentName,
      rules: this.rules,
      props: {
        key: this.key,
        name: this.key,
        label: this.label,
        // rules: this.rules,
        outlined: true,
        items: this.options,
        formClass: this.formClass,
      },
      on : {
        change: this.onChange,
        input: this.onInput
      }
    };
  }
}

export class ComboboxField extends Field {
  key: string;
  componentName = "v-combobox";
  label: string;
  rules: string;
  options: string[];

  constructor(
    key: string,
    label: string,
    rules: string,
    options: string[],
    formClass = FIELD_CLASS_COL
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.rules = rules;
    this.options = options;
  }

  componentData() {
    return {
      componentName: this.componentName,
      rules: this.rules,
      props: {
        key: this.key,
        name: this.key,
        label: this.label,
        // rules: this.rules,
        outlined: true,
        items: this.options,
        formClass: this.formClass,
      },
    };
  }
}

export class AutocompleteField extends Field {
  key: string;
  componentName = "v-autocomplete";
  label: string;
  rules: string;
  options: string[];

  constructor(
    key: string,
    label: string,
    rules: string,
    options: string[],
    formClass = FIELD_CLASS_COL
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.rules = rules;
    this.options = options;
  }

  componentData() {
    return {
      componentName: this.componentName,
      rules: this.rules,
      props: {
        key: this.key,
        name: this.key,
        label: this.label,
        // rules: this.rules,
        outlined: true,
        items: this.options,
        formClass: this.formClass,
      },
    };
  }
}

export class CheckboxField extends Field {
  key: string;
  componentName = "v-checkbox";
  label: string;
  rules: string;
  // options: string[];

  constructor(
    key: string,
    label: string,
    rules: string,
    formClass = FIELD_CLASS_COL
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.rules = rules;
    // this.options = options;
  }

  componentData() {
    return {
      componentName: this.componentName,
      rules: this.rules,
      props: {
        key: this.key,
        name: this.key,
        label: this.label,
        // rules: this.rules,
        outlined: true,
        // items: this.options,
      },
    };
  }
}

export class SwitchField extends Field {
  key: string;
  componentName = "v-switch";
  label: string;
  rules: string;
  value: boolean;
  // options: string[];

  constructor(
    key: string,
    label: string,
    value: boolean,
    rules: string,
    formClass = FIELD_CLASS_COL
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.rules = rules;
    this.value = value;
    // this.options = options;
  }

  componentData() {
    return {
      componentName: this.componentName,
      rules: this.rules,
      props: {
        key: this.key,
        name: this.key,
        label: this.label,
        color: "primary",
        value: this.value,
        // rules: this.rules,
        inset: true,
        // items: this.options,
        formClass: this.formClass,
      },
    };
  }
}

export class FileField extends Field {
  key: string;
  componentName = "v-file-input";
  label: string;
  rules: string;
  accept: string;
  // options: string[];

  constructor(
    key: string,
    label: string,
    rules: string,
    accept?: string,
    formClass = FIELD_CLASS_COL
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.rules = rules;
    this.accept = accept || "";
    // this.options = options;
  }

  componentData() {
    return {
      componentName: this.componentName,
      rules: this.rules,
      props: {
        key: this.key,
        name: this.key,
        label: this.label,
        // rules: this.rules,
        accept: this.accept,
        outlined: true,
        showSize: true,
        truncateLength: "50",
        formClass: this.formClass,
        // items: this.options,
      },
    };
  }
}

export class Button extends Field {
  id: string;
  componentName = "f-btn";
  label: string;
  outlined = false;
  flat = false;
  color = "";
  action: () => void;
  disabled = false;
  // options: string[];

  constructor(
    id: string,
    label: string,
    action: () => void,
    formClass = FIELD_CLASS_COL,
    outlined = true,
    flat = false,
    color = "",
    disabled = false
  ) {
    super(id, formClass);
    this.id = id;
    this.label = label;
    this.action = action;
    this.outlined = outlined;
    this.flat = flat;
    this.color = color;
    this.disabled = disabled;
    // this.options = options;
  }

  componentData() {
    return {
      componentName: this.componentName,
      formClass: this.formClass,
      props: {
        id: this.id,
        label: this.label,
        outlined: this.outlined,
        flat: this.flat,
        color: this.color,
        disabled: this.disabled,
        action: this.action,
        // items: this.options,
      }
    };
  }
}

export class XButton extends Field {
  id: string;
  componentName = "t-btn";
  label: string;
  outlined = false;
  flat = false;
  color = "";
  action: () => void;
  disabled = false;
  // options: string[];

  constructor(
    id: string,
    label: string,
    action: () => void,
    formClass = FIELD_CLASS_COL,
    outlined = false,
    flat = false,
    color = "",
    disabled = false
  ) {
    super(id, formClass);
    this.id = id;
    this.label = label;
    this.action = action;
    this.outlined = outlined;
    this.flat = flat;
    this.color = color;
    this.disabled = disabled;
  }

  componentData() {
    return {
      componentName: this.componentName,
      formClass: this.formClass,
      props: {
        id: this.id,
        label: this.label,
        outlined: this.outlined,
        text: this.flat,
        color: this.color,
        disabled: this.disabled,
//        action: this.action,
        actionObj : {
          click : this.action
        },
        actionClick: this.action
      },
      // on: {
      //   click: this.action
      // },
      // slot : {
      //   default : this.label
      // }
    };
  }
}

export class MiniForm extends Field {
  key: string;
  componentName = "mini-form";
  label: string;
  rules: string;
  accept: string;
  fieldList: Field[];
  // options: string[];

  constructor(
    key: string,
    label: string,
    rules: string,
    fieldList: Field[],
    accept?: string,
    formClass = FIELD_CLASS_COL
  ) {
    super(key, formClass);
    this.key = key;
    this.label = label;
    this.fieldList = fieldList;
    this.rules = rules;
    this.accept = accept || "";
    // this.options = options;
  }

  componentData() {
    return {
      componentName: this.componentName,
      ref: this.key,
      rules: this.rules,
      props: {
        ref: this.key,
        key: this.key,
        name: this.key,
        label: this.label,
        // rules: this.rules,
        accept: this.accept,
        outlined: true,
        showSize: true,
        truncateLength: "50",
        formClass: this.formClass,
        fieldConfigList: this.fieldList.map((comp: any) =>
          comp.componentData()
        ),
        // items: this.options,
      }
    };
  }
}

export class Form extends Field {
  ref: string;
  modelId: string;
  componentName = "f-form";
  label: string;
  fieldConfigList: Field[];
  disabled: boolean;

  constructor(
    modelId: string,
    ref: string,
    label: string,
    fieldConfigList: any[],
    formClass = FIELD_CLASS_COL,
    disabled = false
  ) {
    super(ref, formClass);
    this.ref = ref;
    this.modelId = modelId;
    this.label = label;
    this.fieldConfigList = fieldConfigList;
    this.disabled = disabled;
  }

  componentData() {
    return {
      componentName: this.componentName,
      ref: this.ref,
      modelId: this.modelId,
      props: {
        modelId: this.modelId,
        ref: this.ref,
        name: this.ref,
        label: this.label,
        formClass: this.formClass,
        fieldConfigList: this.fieldConfigList.map((comp: any) =>
          comp.componentData()
        ),
        disabled: this.disabled,
      },
    };
  }
}

export class Stepper {
  // componentName = 'f-stepper';
  ref: string;
  stepList: Step[];
  // options: string[];

  constructor(ref: string, stepList: Step[]) {
    this.ref = ref;
    this.stepList = stepList.map((step) => step);
    // this.options = options;
  }

  // componentData() {
  //   return {
  //     componentName: this.componentName,
  //     props: {
  //       ref: this.ref,
  //       stepList: this.stepList.map((comp: any) => comp.componentData())
  //       // items: this.options,
  //     },
  //   };
  // }
}

export class Step {
  id: string;
  name: string;
  componentList: Field[];
  // options: string[];

  constructor(id: string, name: string, componentList: Field[]) {
    this.id = id;
    this.name = name;
    this.componentList = componentList;
    // this.options = options;
  }

  componentData() {
    return {
      props: {
        id: this.id,
        name: this.name,
        componentList: this.componentList.map((comp: any) =>
          comp.componentData()
        ),
        // items: this.options,
      },
    };
  }
}


interface ComponentDataProvider {
  id: string;
  componentName: string;
  componentData(): object; // todo: change it to getComponentData
}

interface FormComponentDataProvider extends ComponentDataProvider {
  dataSelectorKey: string;
}

export class TextField1 implements FormComponentDataProvider {
  // FIXED
  componentName = "v-text-field";
  type = "text";
  padding = "px-2"
  // MANDATORY
  id: string;
  dataSelectorKey: string;
  label: string;
  // OPTIONAL with Default
  rules: string;
  colWidth: number;
  mandatory: boolean;
  disabled: boolean;
  onInput: (() => void ) | undefined

  constructor({
    id,
    dataSelectorKey,
    label,
    rules = "",
    colWidth = 12,
    mandatory = false,
    disabled = false,
    onInput = undefined
  }: {
    id?: string;
    dataSelectorKey: string;
    label: string;
    rules?: string;
    colWidth?: number;
    mandatory? :boolean;
    disabled?: boolean;
    onInput?: () => void
  }) {
    this.id = !!id ? id : dataSelectorKey;
    this.dataSelectorKey = dataSelectorKey;
    this.label = label;
    this.rules = rules;
    this.colWidth = colWidth;
    this.mandatory = mandatory
    this.disabled = disabled
    this.onInput = onInput
  }

  getBoundaryClass() {
    return `col-${this.colWidth} ${this.padding}`
  }

  getRules() {
    const mandarotyStr = this.mandatory ? "required" : ""
    return `${mandarotyStr}|${this.rules}`
  }
  componentData(): object {
    return {
      componentName: this.componentName,
      rules: this.getRules(),
      formClass: this.getBoundaryClass(), 
      props: {
        key: this.dataSelectorKey,
        type: this.type,
        name: this.dataSelectorKey, // todo: check the name functionalities
        label: this.label,
        outlined: true, // todo: remove this also
        disabled: this.disabled,
      },
      on :{
        input: this.onInput
      }
    };
  }

}


export class Form1 extends Field {
  ref: string;
  modelId: string;
  componentName = "f-form";
  label: string;
  fieldConfigList: Field[];
  disabled: boolean;

  constructor(
    modelId: string,
    ref: string,
    label: string,
    fieldConfigList: any[],
    formClass = FIELD_CLASS_COL,
    disabled = false
  ) {
    super(ref, formClass);
    this.ref = ref;
    this.modelId = modelId;
    this.label = label;
    this.fieldConfigList = fieldConfigList;
    this.disabled = disabled;
  }

  componentData() {
    return {
      componentName: this.componentName,
      ref: this.ref,
      modelId: this.modelId,
      props: {
        modelId: this.modelId,
        ref: this.ref,
        name: this.ref,
        label: this.label,
        formClass: this.formClass,
        fieldConfigList: this.fieldConfigList.map((comp: any) =>
          comp.componentData()
        ),
        disabled: this.disabled,
      },
    };
  }
}
