<template>
  <v-card :outlined="outlined" flat>
    <v-card-subtitle class="overline py-1">{{ label }}</v-card-subtitle>
    <v-card-text class="pb-0">
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
              :is="field.componentName"
              v-model="modelValue[field.props.key]"
              v-bind="field.props"
              :error-messages="errors"
            >
            </component>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import FTextField from "@/components/form/field/FTextField.vue";
import FNumberField from "@/components/form/field/FNumberField.vue";
import FCurrencyField from "@/components/form/field/FCurrencyField.vue";
import ModelVue from "@/components/ModelVue";

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    FTextField,
    FNumberField,
    FCurrencyField
  },
})
export default class FMiniForm extends ModelVue {
  @Prop({
    default: () => {
      return [];
    },
  })
  public fieldList!: any[];

  @Prop({ default: "" })
  public label!: string;

  @Prop({ default: "" })
  public id!: string;

  @Prop({ default: false })
  public boundaryClass!: string;

  @Prop({ default: false })
  public disabled!: boolean;

  @Prop({ default: true })
  public outlined!: boolean;


}
</script>
