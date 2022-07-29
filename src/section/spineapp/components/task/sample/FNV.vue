<template>
  <div class="FNV">
    I am in FNV
    
    <v-card outlined flat>
      <v-card-text class="pb-0">
        <component
          key="addCreditorFormData"
          :ref="formMD.componentRef"
          :is="formMD.componentName"
          v-model="modelValue"
          v-bind="formMD.props"
        ></component>
        <!-- <v-text-field :value="modelValue.person.name" @input="updateName" ></v-text-field>
        <v-text-field v-model="modelValue.person.firstNumber" ></v-text-field>   -->
      </v-card-text>
    </v-card>
    <!-- <v-btn @click="updateData">update</v-btn> -->

    <kbd>{{ value }}</kbd>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FForm from "@/components/form/FForm.vue";

@Component({
  components: {
    "f-form": FForm,
  },
})
export default class FNV extends Vue {
  @Prop()
  formMD!: any;


 // V-MODEL START
  @Prop()
  value!: string;

  get modelValue(): string {
    return this.value;
  }

  set modelValue(newValue) {
    this.$emit('input', newValue)
  }
  // V-MODEL END
}
</script>

<style></style>
