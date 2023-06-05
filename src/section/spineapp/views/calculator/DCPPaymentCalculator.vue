<template>
  <v-card flat>
    <v-container>
      <v-card outlined flat class="DCPPaymentCalculator">
        <f-loader v-if="showLoader" />
        <component
          :ref="registerMyCFFFormMetaData.myRefName"
          :is="registerMyCFFFormMetaData.componentName"
          :value="selectModel(registerDCPClientFormData, undefined)"
          v-bind="registerMyCFFFormMetaData.props"
        ></component>
      </v-card>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import RegisterMyCFFFormMDP from "../myfiles/RegisterMyCFFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import Helper from "../../util/Helper";
import ErrorResponse from "@/error-response";

@Component({
  components: {
    FForm,
  },
})
export default class DCPPaymentCalculator extends ModelVue {
  @Prop()
  onCancelClick: () => void;

  showLoader: boolean = false;
  clientFileNumber: string;
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  registerDCPClientFormData: Data.DCPClientFile.RegisterAndAddClientFileToMyQInput =
    new Data.DCPClientFile.RegisterAndAddClientFileToMyQInput();
  addNoteInput: Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();

  handleRegisterFormCancelClick() {
    this.onCancelClick();
  }

  get registerMyCFFFormMetaData() {
    return new RegisterMyCFFFormMDP({
      root: this,
      hideCancel: !this.onCancelClick,
    }).getMetaData();
  }

  getCFBasicInfoAndAddNote() {
    Action.ClientFile.GetClientFileBasicInfo.execute1(
      this.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.$router.replace({
            name: "Root.DCPCFile.DCPCFInfo.DCPCFClientInfo",
            params: { clientFileId: this.clientFileBasicInfo.clientFileId },
          });
          //   this.addNote();
        }, 1000);
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  registerClient() {
    this.showLoader = true;
    this.registerDCPClientFormData.programCode =
      Data.DCPClientFile.PROGRAM_CODE.DCP;
    Action.DCPClientFile.RegisterAndAddClientFileToMyQ.execute(
      this.registerDCPClientFormData,
      (output) => {
        setTimeout(() => {
          this.clientFileNumber = output.clientFileNumber;
          this.getCFBasicInfoAndAddNote();
        }, 500);
      },
      (error) => {
        ErrorResponse.handle(error);
        this.showLoader = false;
      }
    );
  }
}
</script>

<style></style>
