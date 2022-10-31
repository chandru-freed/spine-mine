<template>
  <div>
    <v-card flat outlined>
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
  
  registerClientFormData: any = new Data.Client.RegisterClientForm()
  

  get registerClientFormMetaData(): any {
    return new RegisterClientFFormMDP({root: this}).getMetaData()
  }


registerClient () {
    Action.Client.RegisterClient.execute(this.registerClientFormData, (output: any) => {
      console.log("RegisterClient : ",output)
        const clientId = output.clientId
       setTimeout(() => {
        Helper.Router.gotoClient({router: this.$router, clientId: clientId})
        }, 1000);
    } )
}

  
}
</script>