<template>
  <div>
    <v-snackbar
      min-width="400px"
      max-width="500px"
      top
      :vertical="true"
      :value="confirmationAlertInfo.show"
      :timeout="-1"
    >
      {{ confirmationAlertInfo.message }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="handleCancelClick()"> Cancel </v-btn>
        <v-btn color="green" text v-bind="attrs" @click="handleConfirmClick()">
          Confirm
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";
import store, * as Store from "@/../src-gen/store";
import Helper from "@/section/spineapp/util/Helper";
import FSnackbar from "@/fsnackbar";

@Component
export default class FConfirmation extends Vue {
  @Store.Getter.Spine.GenericStore.confirmationAlertInfo
  confirmationAlertInfo: any;

  handleConfirmClick() {
    console.log(this.confirmationAlertInfo);
    this.confirmationAlertInfo.onConfirm();
    FSnackbar.hide();
  }

  handleCancelClick() {
    FSnackbar.hide();
  }
}
</script>