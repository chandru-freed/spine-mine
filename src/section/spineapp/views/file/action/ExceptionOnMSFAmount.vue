<template>
  <div class="ExceptionOnMSFAmount">
      <v-card flat>
      <div class="d-flex justify-space-between align-center mx-5">
      <h4>Exception On MSF Amount</h4>
      <v-btn @click="gotoAction" text icon color="lighten-2" class="ma-2">
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>
      <component
        v-if="!!exceptionOnMSFAmountFFFormMetaData"
        :ref="exceptionOnMSFAmountFFFormMetaData.myRefName"
        :is="exceptionOnMSFAmountFFFormMetaData.componentName"
        :value="selectModel(takeExceptionOnMSFAmountInput, undefined)"
        @input="(newValue) => updateModel(takeExceptionOnMSFAmountInput, newValue, undefined)"
        v-bind="exceptionOnMSFAmountFFFormMetaData.props"
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
import CFRecordMSFFFormMDP from './CFRecordMSFFFormMDP';
import ModelVue from '@/components/generic/ModelVue';
import FForm from '@/components/generic/form/FForm.vue';
import ExceptionOnMSFAmountFFFormMDP from './ExceptionOnMSFAmountFFFormMDP';

@Component({
  components:{
    FForm
  }
})
export default class ExceptionOnMSFAmount extends ModelVue {
takeExceptionOnMSFAmountInput: Data.ClientFile.TakeExceptionOnMSFAmountInput = new Data.ClientFile.TakeExceptionOnMSFAmountInput();
 get exceptionOnMSFAmountFFFormMetaData() {
    return new ExceptionOnMSFAmountFFFormMDP({
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
