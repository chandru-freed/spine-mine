<template>
  <div>
    <v-card flat>
      <v-card-title>Register Client</v-card-title>
      <v-card-text >
        <component
          v-if="!!registerClientFormMetaData"
          :ref="registerClientFormMetaData.myRefName"
          :is="registerClientFormMetaData.componentName"
          v-model="registerClientFormData"
          v-bind="registerClientFormMetaData.props"
        ></component>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import FForm from "@/components/generic/form/FForm.vue";
import RegisterClientFFormMDP from "./RegisterClientFFormMDP";
import Helper from "../../util/Helper";

@Component({
  components: {
    FForm,
  },
})
export default class RegisterClient extends Vue {

  selectedRequestType: any = {};
  
  // registerClientFormData: any = new Data.Client.RegisterClientForm()
  registerClientFormData: Data.Client.RegisterAndAddClientFileForm =
    new Data.Client.RegisterAndAddClientFileForm();
  

  get registerClientFormMetaData(): any {
    return new RegisterClientFFormMDP({root: this}).getMetaData()
  }


registerClient () {

  Action.Client.RegisterAndEnroll.execute(
      this.registerClientFormData,
      (output: any) => {
        setTimeout(() => {
          this.gotoFile(output.clientFileNumber);
        }, 500);
      }
    );
    // Action.Client.RegisterClient.execute(this.registerClientFormData, (output: any) => {
    //     const clientId = output.clientId
    //    setTimeout(() => {
    //     Helper.Router.gotoClient({router: this.$router, clientId: clientId})
    //     }, 1000);
    // } )
}

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  goBack() {
    this.$router.back();
  }


  
}
</script>