<template>
  <div>
    <v-dialog
      min-width="600px"
      :value="confirmationAlertInfo.show"
      @click:outside="handleCancelClick()"
      width="500"
      content-class="dialog-top-align"
    >
      <v-card>
        <v-card-title> Confirmation </v-card-title>
        <v-card-text>
          {{ confirmationAlertInfo.message }}
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn text v-bind="attrs" @click="handleCancelClick()">
            Cancel
          </v-btn>
          <v-btn
            color="green"
            text
            v-bind="attrs"
            @click="handleConfirmClick()"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

<style scoped>
::v-deep .dialog-top-align {
  position: fixed;
  top: 0;
  transform: translateY(0%) !important;
}
</style>
