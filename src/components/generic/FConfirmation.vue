<template>
<div>
  FConfirmation {{confirmationAlertInfo}}
    <v-alert
      v-if="showAlertBox"
      dense
      outlined
      text
      :color="color"
      class="ma-2"
    >
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <div class="my-1">{{message}}</div>
        <v-spacer />
        <v-btn
          @click="() => $emit('cancelClick')"
          outlined
          :color="color"
          class="mx-2"
          small
          >Cancel</v-btn
        >
        <v-btn small @click="() => $emit('confirmClick')" outlined :color="color" class="mx-2">
          Confirm
        </v-btn>
      </div>
    </v-alert>
</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";
import store, * as Store from "@/../src-gen/store";

@Component
export default class FConfirmation extends Vue {
  @Store.Getter.Spine.GenericStore.confirmationAlertInfo
  confirmationAlertInfo: any;
  message: string;
  color: string;

  onConfirmarion: () => void;
  onCancel?: () => void

  showAlertBox: boolean = false;

  showAlert(message: string, onConfirmation: () => void,onCancel?: () => void) {
    this.showAlertBox = true;
    this.message = message; 
    this.onConfirmarion = onConfirmation;
    this.onCancel = onCancel;
  }

  handleConfirmationClick() {
    this.onConfirmarion();
  }

  handleCancelClick() {
    // this.showAlertBox = false;
    if(this.onCancel) {
    this.onCancel();
    }
  }

}
</script>