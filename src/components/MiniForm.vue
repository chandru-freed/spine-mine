<template>
  <v-card outlined flat>
    <v-card-subtitle class="overline py-1">{{ label }}</v-card-subtitle>
    <v-card-text class="pb-0">
      <v-form>
        <v-row no-gutters>
          <v-col
            :class="component.props.formClass"
            v-for="(component, index) in componentList"
            :key="index"
          >
            <ValidationProvider
              :name="component.props.label"
              :rules="component.rules"
              v-slot="{ errors, valid }"
            >
              <component
                dense
                :is="component.componentName"
                v-model="myForm[component.props.id]"
                v-bind="component.props"
                :error-messages="errors"
                :success="valid"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import {
  VTextField,
  VSelect,
  VCheckbox,
  VSwitch,
  VTextarea,
  VCombobox,
  VAutocomplete,
  VFileInput,
} from "vuetify/lib";
import { Field } from "src-def/form/FormComponentDef";

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "v-text-field": VTextField,
    "v-select": VSelect,
    "v-checkbox": VCheckbox,
    "v-switch": VSwitch,
    "v-textarea": VTextarea,
    "v-combobox": VCombobox,
    "v-autocomplete": VAutocomplete,
    "v-file-input": VFileInput,
  },
})
export default class MiniForm extends Vue {
  @Prop({
    default: () => {
      return [];
    },
  })
  public fieldConfigList!: Field[];

  @Prop({ default: "" })
  public name!: string;

  @Prop({ default: "" })
  public label!: string;

  @Prop({ default: "" })
  public id!: string;

  @Prop({ default: false })
  public outlined!: string;

  @Prop({ default: false })
  public formClass!: string;

  public items = ["", "Foo", "Bar"];

  public myForm = {};

  @Watch("myForm")
  updateMyForm(oldValue: any, newValue: any) {
    this.$emit("input", newValue);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async clear() {
    this.myForm = {};
    requestAnimationFrame(() => {
      this.$refs.fileInfoObs.reset();
    });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  submit() {
    console.log("submitting!");
  }

  get componentList() {
    return this.fieldConfigList; //.map((comp: any) => comp.toComponentData());
  }

  public created() {
    console.log("I am on created");
    // console.log(FormConfig);
  }

  public mounted() {
    console.log("I am on mouned");
    // console.log(FormConfig);
    return;
  }
}
</script>
