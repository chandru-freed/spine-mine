<template>
  <div class="row justify-center pa-0">
    <div class="col-12">
      FForm Data : {{modelValue}}
      <ValidationObserver :ref="myRef" v-slot="{}">
        <v-card flat color="transparent">
          <v-card-text class="pa-0">
            <v-form :disabled="disabled">
              <v-row no-gutters>
                <v-col
                  v-for="(field, index) in fieldList"
                  :key="index"
                  :class="field.boundaryClass"
                >
                  <ValidationProvider
                    :vid="field.props.id"
                    :name="field.props.label"
                    :rules="field.rules"
                    v-slot="{ errors }"
                  >
                    <component
                      dense
                      :is="field.componentName"
                      v-model="modelValue[field.props.key]"
                      v-bind="field.props"
                      :error-messages="errors"
                    >
                    </component>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="otherChildren.length > 0">
            <v-row no-gutters>
              <v-col
                v-for="(otherChild, index) in otherChildren"
                :key="index"
                :class="otherChild.boundaryClass"
              >
                <component
                  :is="otherChild.componentName"
                  v-bind="otherChild.props"
                >
                </component>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import {
  VSelect,
  VCheckbox,
  VSwitch,
  VTextarea,
  VCombobox,
  VAutocomplete,
  VFileInput,
} from "vuetify/lib";
import FBtn from "@/components/FBtn.vue";
import FTextField from "@/components/form/field/FTextField.vue";
import FTextarea from "@/components/form/field/FTextarea.vue";
import FNumberField from "@/components/form/field/FNumberField.vue";
import FSwitch from "@/components/form/field/FSwitch.vue";
import FSelect from "@/components/form/field/FSelect.vue";
import FAddress from "@/components/form/field/FAddress.vue";
import FDocument from "@/components/form/field/FDocument.vue";
import FMiniForm from "@/components/form/field/FMiniForm.vue";
import FMiniFormWithTotal from "@/components/form/field/FMiniFormWithTotal.vue";
import ModelVue from "@/components/ModelVue"


@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    FBtn,
    FTextField,
    "v-select": VSelect,
    "v-checkbox": VCheckbox,
    "v-switch": VSwitch,
    "v-textarea": VTextarea,
    "v-combobox": VCombobox,
    "v-autocomplete": VAutocomplete,
    "v-file-input": VFileInput,
    "f-textarea": FTextarea,
    "f-number-field": FNumberField,
    "f-switch": FSwitch,
    "f-select": FSelect,
    "f-address": FAddress,
    "f-document": FDocument,
    "f-mini-form": FMiniForm,
    "f-mini-form-with-total": FMiniFormWithTotal,
    
  },
})

export default class FForm extends ModelVue {
  

  @Prop({ default: "" })
  public id!: string;

  @Prop({ default: "" })
  public myRef!: string;

  @Prop({ default: "" })
  public name!: string;

  @Prop({
    default: () => {
      return [];
    },
  })
  public fieldList!: any[];

  @Prop({
    default: () => {
      return [];
    },
  })
  public otherChildren!: any[];

  @Prop({ default: false })
  disabled: boolean;

  


  onSubmit(action: any) {
    (this.$refs[this.myRef] as any).validate().then((success: boolean) => {
      if (success) {
        action(this.modelValue);
        return;
      } else {
      }
    });
  }

  
}
</script>
