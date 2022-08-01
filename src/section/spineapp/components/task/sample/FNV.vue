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
    <v-btn @click="doubleIt">update</v-btn>
    {{doubleFirstNumberLocal}}
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
import ModelVue from "@/../src-def/ModelVue"

@Component({
  components: {
    "f-form": FForm,
  },
})
export default class FNV extends ModelVue {
  @Prop()
  formMD!: any;

  doubleFirstNumberLocal = 7

  doubleIt() {
    this.modelValue.firstNumber = this.doubleFirstNumberLocal
  }

  mounted() {
    console.log("I am in FNV Mounted");
    console.log(this.$refs)
    console.log("I am in FNV Mounted");
  }

}
</script>

<style></style>
