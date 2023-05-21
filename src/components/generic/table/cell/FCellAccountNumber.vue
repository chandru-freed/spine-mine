<template>
  <span>
    {{ accountNumber }}

    <span v-if="isAdmin()">
      <v-icon small class="ml-2" v-if="eyeStatus" @click="eyeClick"
        >mdi-eye</v-icon
      >
      <v-icon small class="ml-2" v-else @click="eyeClick">mdi-eye-off</v-icon>
    </span>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";

@Component({
  components: {},
})
export default class FCellAccountNumber extends ModelVue {
  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[];

  eyeStatus: boolean = false;
  @Prop()
  dataSelectorKey: string;

  mask = (cc: any, num = 4, mask = "*") =>
    ("" + cc).slice(0, -num).replace(/./g, mask) + ("" + cc).slice(-num);

  get accountNumber() {
    return this.eyeStatus
      ? this.selectModel(this.modelValue, this.dataSelectorKey)
      : this.mask(this.selectModel(this.modelValue, this.dataSelectorKey));
  }

  eyeClick() {
    this.eyeStatus = !this.eyeStatus;
  }

  isAdmin() {
    return this.roleList?.includes("Admin");
  }
}
</script>
