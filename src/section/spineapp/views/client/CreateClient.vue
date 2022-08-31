<template>
  <div>
    <v-card flat outlined>
      <v-card-title>Register Client</v-card-title>
      <v-card-text >
        <component
          v-if="!!createClientFormMetaData"
          :ref="createClientFormMetaData.myRefName"
          :is="createClientFormMetaData.componentName"
          v-model="registerClientFormData"
          v-bind="createClientFormMetaData.props"
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
import * as RemoteApiPoint from "@/remote-api-point";
import FForm from "@/components/generic/form/FForm.vue";
import CreateClientFFormMDP from "./CreateClientFFormMDP";
import Flow from "@/section/spineapp/util/Flow"
import CreateClientIntf from "./CreateClientIntf";
import Helper from "../../util/Helper";

@Component({
  components: {
    FForm,
  },
})
export default class CreateClient extends Vue implements CreateClientIntf{

  selectedRequestType: any = {};
  
  registerClientFormData: any = new Data.Client.RegisterClientForm()
  

  get createClientFormMetaData(): any {
    return new CreateClientFFormMDP({root: this}).getMetaData()
  }


createClient () {
    // Action.Client.CreateClient.execute(this.createClientFormData, output => {
    //     Helper.Router.gotoClient({router: this.$router, clientId: this.createClientFormData.clientId})
    // } , err => {}, RemoteApiPoint.SpineApi)
    Action.Client.RegisterClient.execute(this.registerClientFormData, (output: any) => {
      console.log("RegisterClient : ",output)
      
        const clientId = output.clientId
        Helper.Router.gotoClient({router: this.$router, clientId: clientId})
    } , err => {}, RemoteApiPoint.SpineApi)
}

  
}
</script>