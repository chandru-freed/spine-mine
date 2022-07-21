<template>
  <div class="row justify-center pa-0">
    <div class="col-12">
      <ValidationObserver :ref="formRef" v-slot="{}">
        <v-card flat color="transparent">
          <v-card-text class="pa-0">
            <v-form :disabled="disabled">
              <v-row no-gutters >
                <v-col
                  v-for="(child, index) in children"
                  :key="index"
                  :class="child.boundaryClass"
                >
                  <ValidationProvider
                    :name="child.props.id"
                    :rules="child.rules"
                    v-slot="{ errors }"
                  >
                    <component
                      dense
                      :is="child.componentName"
                      v-model="myForm[child.props.key]"
                      v-bind="child.props"
                      :error-messages="errors"
                    >
                    </component>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
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
import { FormComponentDataProvider } from "src-def/form/FormComponentDef";
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
  
  @Prop({ default: "" })
  public id!: string;

  @Prop({ default: "" })
  public formRef!: string;

  @Prop({ default: "" })
  public name!: string;

  @Prop({
    default: () => {
      return [];
    },
  })
  public children!: FormComponentDataProvider[];

  @Prop({ default: false })
  disabled: boolean;

  // TWO WAY BINDING V_MODEL --- START
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
  // TWO WAY BINDING V_MODEL --- END

  public mounted() {
    this.myForm = this.value;
    return;
  }

  onSubmit(action: any) {
    (this.$refs[this.formRef] as any).validate().then((success: boolean) => {
      if (success) {
        action(this.myForm);
        return;
      } else {
      }
    });
  }
}
</script>
