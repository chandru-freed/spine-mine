const FIELD_CLASS_COL = " col-12 "
const FIELD_CLASS_MARGIN = " px-2"

export class Field {
    id: string;
    formClass = 'col-12';
    
    constructor(id: string, formClass: string) {
      this.id = id || new Date().toString();
      this.formClass = formClass + FIELD_CLASS_MARGIN
    }
  }
 
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export class TextField extends Field {
    key: string;
    componentName = 'v-text-field';
    type = 'text';
    label: string;
    rules: string;
    
  
    constructor(key: string, label: string, rules: string, formClass = FIELD_CLASS_COL) {
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
          // rules: this.rules,
          outlined: true,
          formClass: this.formClass
          // rounded: true,
        },
      };
    }
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export class EmailField extends Field {
    key: string;
    type = 'text';
    componentName = 'v-text-field';
    label: string;
    rules: string;
    placeholder?: string
    hint?: string
  
    constructor(key: string, label: string, rules: string, placeholder?: string, hint?: string, formClass = FIELD_CLASS_COL) {
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
          formClass: this.formClass
        },
      };
    }
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export class TextareaField extends Field {
    key: string;
    type = 'text';
    componentName = 'v-textarea';
    label: string;
    rules: string;
    placeholder?: string
    hint?: string
  
    constructor(key: string, label: string, rules: string, placeholder?: string, hint?: string, formClass = FIELD_CLASS_COL) {
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
          formClass: this.formClass
        },
      };
    }
  }
  
  export class SelectField extends Field {
    key: string;
    componentName = 'v-select';
    label: string;
    rules: string;
    options: string[];
  
    constructor(key: string, label: string, rules: string, options: string[], formClass = FIELD_CLASS_COL) {
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
          formClass: this.formClass
        },
      };
    }
  }
  
  export class ComboboxField extends Field {
    key: string;
    componentName = 'v-combobox';
    label: string;
    rules: string;
    options: string[];
  
    constructor(key: string, label: string, rules: string, options: string[], formClass = FIELD_CLASS_COL) {
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
          formClass: this.formClass
        },
      };
    }
  }
  
  export class AutocompleteField extends Field {
    key: string;
    componentName = 'v-autocomplete';
    label: string;
    rules: string;
    options: string[];
  
    constructor(key: string, label: string, rules: string, options: string[], formClass = FIELD_CLASS_COL) {
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
          formClass: this.formClass
        },
      };
    }
  }
  
  export class CheckboxField extends Field {
    key: string;
    componentName = 'v-checkbox';
    label: string;
    rules: string;
    // options: string[];
  
    constructor(key: string, label: string, rules: string, formClass = FIELD_CLASS_COL) {
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
    componentName = 'v-switch';
    label: string;
    rules: string;
    value: boolean;
    // options: string[];
  
    constructor(key: string, label: string, value: boolean, rules: string, formClass = FIELD_CLASS_COL) {
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
          value: this.value,
          // rules: this.rules,
          inset: true,
          // items: this.options,
          formClass: this.formClass
        },
      };
    }
  }
  
  export class FileField extends Field {
    key: string;
    componentName = 'v-file-input';
    label: string;
    rules: string;
    accept: string;
    // options: string[];
  
    constructor(key: string, label: string, rules: string, accept?: string, formClass = FIELD_CLASS_COL) {
      super(key, formClass);
      this.key = key;
      this.label = label;
      this.rules = rules;
      this.accept = accept || '';
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
          truncateLength:"50",
          formClass: this.formClass
          // items: this.options,
        },
      };
    }
  }

  export class Button extends Field {
    id: string;
    componentName = 'f-btn';
    label: string;
    outlined = false;
    flat = false;
    color = '';
    action: () => void;
    // options: string[];
  
    constructor(id: string, label: string, action: () => void, formClass = FIELD_CLASS_COL, outlined = false, flat = false, color = '') {
      super(id, formClass);
      this.id = id;
      this.label = label;
      this.action = action
      this.outlined = outlined
      this.flat = flat
      this.color = color
      // this.options = options;
    }
  
    componentData() {
      return {
        componentName: this.componentName,
        props: {
          id: this.id,
          label: this.label,
          outlined: this.outlined,
          flat: this.flat,
          color: this.color,
          formClass: this.formClass,
          onClick: this.action
          // items: this.options,
        }
      };
    }
  }

  export class MiniForm extends Field {
    key: string;
    componentName = 'mini-form';
    label: string;
    rules: string;
    accept: string;
    fieldList: Field[]
    // options: string[];
  
    constructor(key: string, label: string, rules: string, fieldList: Field[], accept?: string, formClass = FIELD_CLASS_COL) {
      super(key, formClass);
      this.key = key;
      this.label = label;
      this.fieldList = fieldList;
      this.rules = rules;
      this.accept = accept || '';
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
          truncateLength:"50",
          formClass: this.formClass,
          fieldConfigList: this.fieldList.map((comp: any) => comp.componentData())
          // items: this.options,
        },
      };
    }
  }


  export class Form extends Field {
    ref: string;
    componentName = 'f-form';
    label: string;
    rules: string;
    accept: string;
    fieldConfigList: Field[]
    // options: string[];
  
    constructor(ref: string, label: string, rules: string, fieldConfigList: Field[], accept?: string, formClass = FIELD_CLASS_COL) {
      super(ref, formClass);
      this.ref = ref;
      this.label = label;
      this.fieldConfigList = fieldConfigList;
      this.rules = rules;
      this.accept = accept || '';
      // this.options = options;
    }
  
    componentData() {
      return {
        componentName: this.componentName,
        rules: this.rules,
        ref: this.ref,
        props: {
          ref: this.ref,
          name: this.ref,
          label: this.label,
          // rules: this.rules,
          accept: this.accept,
          outlined: true,
          showSize: true,
          truncateLength:"50",
          formClass: this.formClass,
          fieldConfigList: this.fieldConfigList.map((comp: any) => comp.componentData())
          // items: this.options,
        },
      };
    }
  }
