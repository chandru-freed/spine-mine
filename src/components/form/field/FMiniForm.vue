<template>
  <v-card color="transparent" flat>
    <v-card-subtitle class="overline py-1">{{ label }}</v-card-subtitle>
    <v-card-text class="pb-0">
      <v-form>
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
                v-model="miniFormData[field.props.key]"
                v-bind="field.props"
                :error-messages="errors"
              >
              </component>
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
import FBtn from "@/components/FBtn.vue";
import FTextField from "@/components/form/field/FTextField.vue";
import FSwitch from "@/components/form/field/FSwitch.vue";
import FAddress from "@/components/form/field/FAddress.vue";

@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "f-text-field": FTextField,
    "f-switch": FSwitch,
    "f-address": FAddress,
    "f-btn": FBtn,
  },
})
export default class FMiniForm extends Vue {
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
  public outlined!: string;

  @Prop({ default: false })
  public boundaryClass!: string;

  // V-MODEL START
  @Prop({
    default: () => {
      return {};
    },
  })
  value!: any;

  miniFormData: any = {};

  get modelValue(): any {
    return this.miniFormData;
  }

  set modelValue(value) {
    this.miniFormData = value;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("miniFormData")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  mounted() {
    this.miniFormData = this.value;
  }
  // V-MODEL END
}
</script>
