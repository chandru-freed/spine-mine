<template>
  <div class="row justify-center pa-0">
    {{myForm}}
    <div class="col-12">
      <ValidationObserver :ref="formKey" v-slot="{}">
        <!-- invalid, validated, handleSubmit, validate  -->
        <v-card flat color="transparent">
          <!-- {{fieldConfigList}} -->
          <v-card-text class="pa-0">
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
                    v-slot="{ errors }"
                  >
                  <!--v-slot="{ errors, valid }"-->
                  <!-- :success="valid"  add to the below component to highlight the field as green if valid-->
                    <component
                      dense
                      :is="component.componentName"
                      v-model="myForm[component.props.key]"
                      v-bind="component.props"
                      :error-messages="errors"
                      
                      v-on="component.events"
                      :disabled="disabled ? disabled : component.props.disabled"
                    />
                    <!-- {{component}} -->
                    <!-- <v-btn v-on="{ click : onSave}" outlined color="secondary">Validate</v-btn> -->
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <!-- <v-card-actions>
          <v-btn @click="clear" text>Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="validate()" outlined color="secondary">Validate</v-btn>
          <v-btn color="primary" class="elevation-0" @click="handleSubmit(submit)" :disabled="invalid || !validated">
            Sign Up
          </v-btn>
        </v-card-actions> -->
        </v-card>
        <!-- <code>{{myForm}}</code> -->
      </ValidationObserver>
    </div>
  </div>
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
import MiniForm from "@/components/MiniForm.vue";
import FBtn from "@/components/FBtn.vue";
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
    "mini-form": MiniForm,
    "f-btn": FBtn,
  },
})
export default class FForm extends Vue {
  @Prop({
    default: () => {
      return [];
    },
  })
  public fieldConfigList!: Field[];
  // @Prop({ default: "" })
  // public ref!: string;

  @Prop({ default: false })
  disabled: boolean;

  @Prop({ default: "" })
  public modelId!: string;

  @Prop({ default: "" })
  public name!: string;

  @Prop({ default: "" })
  public label!: string;

  @Prop({ default: "" })
  public formKey!: string;

  @Prop({ default: false })
  public outlined!: string;

  @Prop({ default: false })
  public formClass!: string;

  @Prop({
    default: () => {
      return {};
    },
  })
  public value!: object;

  get myForm() {
    return this.value;
  }

  set myForm(value) {
    this.value = value;
  }

  @Watch("myForm")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async clear() {
    this.myForm = {};
    requestAnimationFrame(() => {
      this.$refs[this.formKey].reset();
    });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  submit() {
    // console.log("submitting!");
  }

  get componentList() {
    return this.fieldConfigList; //.map((comp: Field) => comp.componentData());
  }

  public created() {
    // console.log("I am on created");
    // // console.log(FormConfig);
  }

  public mounted() {
    // console.log("I am on mouned");
    // // console.log(FormConfig);
    this.myForm = this.value;
    return;
  }

  public onSave() {
    // console.log("-----------FForm onSave ---------------");
  }

  private callbackAction(actionId: string) {
    // console.log("I am in callback action");
    // const vm: any = this;
    // (this.$refs[this.formKey] as any).validate().then((success: boolean) => {
    //   if (success) {
    // //     // console.log('success');
    //     this.$emit(actionId, vm.myForm);
    // //     // console.log( actionId);
    // //     // console.log( vm.formData);
    //     return;
    //   } else {
    // //     console.log("callbackAction errors");
    //   }
    // });
  }

  onSubmit(action: any) {
    console.log("I am in callback action - " + action);
    // console.log(this);

    (this.$refs[this.formKey] as any).validate().then((success: boolean) => {
      if (success) {
        // // console.log('success');
        // this.$emit(actionId, vm.myForm);
        action(this.myForm);
        // // console.log( actionId);
        // // console.log( vm.formData);
        return;
      } else {
        // console.log("callbackAction errors");
      }
    });
  }
}
</script>
