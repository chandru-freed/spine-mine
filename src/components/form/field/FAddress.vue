<template>
  <v-row no-gutters>
    <v-col class="col-12 px-2">
      <ValidationProvider
        vid="addressLine1"
        name="Address Line 1"
        rules="required"
        v-slot="{ errors }"
      >
        <v-textarea
          v-model="modelValue.addressLine1"
          label="Address Line 1"
          outlined
          dense
          :error-messages="errors"
        ></v-textarea>
      </ValidationProvider>
    </v-col>
    <v-col class="col-6 px-2">
      <ValidationProvider
        vid="city"
        name="City"
        rules="required"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="modelValue.city"
          label="City"
          outlined
          dense
          :error-messages="errors"
        ></v-text-field>
      </ValidationProvider>
    </v-col>
    <v-col class="col-6 px-2">
      <ValidationProvider
        vid="state"
        name="State"
        rules="required"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="modelValue.state"
          label="State"
          outlined
          dense
          :error-messages="errors"
        ></v-text-field>
      </ValidationProvider>
    </v-col>
    <v-col class="col-6 px-2">
      <ValidationProvider
        vid="country"
        name="Country"
        rules="required"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="modelValue.country"
          label="Country"
          outlined
          dense
          :error-messages="errors"
        ></v-text-field>
      </ValidationProvider>
    </v-col>
    <v-col class="col-6 px-2">
      <ValidationProvider
        vid="pinCode"
        name="PIN"
        rules="required"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="modelValue.pinCode"
          label="PIN"
          outlined
          dense
          :error-messages="errors"
        ></v-text-field>
      </ValidationProvider>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { VTextField } from "vuetify/lib";
import { ValidationObserver, ValidationProvider } from "vee-validate";
@Component({
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
    "v-text-field": VTextField,
  },
})
export default class FAddress extends Vue {
  @Prop()
  onChange: () => void;

  // V-MODEL START
  @Prop({
    default: () => {
      return {};
    },
  })
  value!: any;

  address = { country: "India"};

  get modelValue(): any {
    return this.address;
  }

  set modelValue(value) {
    this.address = value;
  }

  // WATCH as the MODEL VALUE is a OBJ -
  // And Fields inside the Object if change does not call set of Computed
  @Watch("address")
  updateMyForm(value: any, oldValue: any) {
    this.$emit("input", value);
  }

  mounted() {
    this.address = this.value;
  }
  // V-MODEL END
}
</script>
