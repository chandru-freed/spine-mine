<template>
  <div class="RecordMSFPayment">
      <v-card flat>
      <div class="d-flex justify-space-between align-center mx-5">
      <h4>Record SPA</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
      <component
        v-if="!!cfRecordSPAFFormMetaData"
        :ref="cfRecordSPAFFormMetaData.myRefName"
        :is="cfRecordSPAFFormMetaData.componentName"
        :value="selectModel(recordSPAPaymentInput, undefined)"
        @input="(newValue) => updateModel(recordSPAPaymentInput, newValue, undefined)"
        v-bind="cfRecordSPAFFormMetaData.props"
      ></component>
    </v-card>
  </div>

</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
// import store, * as Store from '@/../src-gen/store';
import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
import * as Action from '@/../src-gen/action';
import CFRecordSPAFFormMDP from './CFRecordSPAFFormMDP';
import ModelVue from '@/components/generic/ModelVue';
import FForm from '@/components/generic/form/FForm.vue';

@Component({
  components:{
    FForm
  }
})
export default class RecordSPAPayment extends ModelVue {
recordSPAPaymentInput: Data.ClientFile.RecordSPAPaymentInput = new Data.ClientFile.RecordSPAPaymentInput();
 get cfRecordSPAFFormMetaData() {
    return new CFRecordSPAFFormMDP({
      parent: this,
    }).getMetaData();
  }
  // META DATA


  get clientFileId() {
    return this.$route.params.clientFileId;
  }

  gotoAction(paymentId: string) {
    this.$router.push({
      name: "Root.CFile.CFAction.CFActionList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
  }

  gotoCFPayment() {
     this.$router.push({
      name: "Root.CFile.CFPayment.CFPaymentList",
      params: {
        clientFileId: this.clientFileId,
      },
    });
    
  }
}

</script>

<style>
</style>
