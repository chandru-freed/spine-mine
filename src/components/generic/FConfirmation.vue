<template>
<div>
    <v-alert
    v-if="confirmationAlertInfo.show"
      dense
      outlined
      text
      class="ma-2"
    >
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <div class="my-1">{{confirmationAlertInfo.message}}</div>
        <v-spacer />
        <v-btn
          @click="() => handleCancelClick()"
          outlined
          class="mx-2"
          small
          >Cancel</v-btn
        >
        <v-btn small @click="handleConfirmClick()" outlined class="mx-2">
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
  
  handleConfirmClick() {
    this.confirmationAlertInfo.onConfirm();
  }

  handleCancelClick() {
      Store.Mutation.Spine.GenericStore.SHOW_CONFIRMATION({show: false,message: "", onConfirm: undefined})
    
  }

}
</script>