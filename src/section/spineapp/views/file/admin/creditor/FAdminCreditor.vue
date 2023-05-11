<template>
  <div ref="creditorListRef">
    <v-col class="col-12">
        <component
      v-if="addCreditorDialog"
      :is="addCreditorFormMetaData.componentName"
      :ref="addCreditorFormMetaData.myRefName"
      :value="selectModel(addCreditorForm, undefined)"
      @input="(newValue) => updateModel(addCreditorForm, newValue, undefined)"
      v-bind="addCreditorFormMetaData.props"
    ></component>

    <component
      v-if="editCreditorDialog"
      :is="editCreditorFormMetaData.componentName"
      :ref="editCreditorFormMetaData.myRefName"
      :value="selectModel(editCreditorForm, undefined)"
      @input="(newValue) => updateModel(editCreditorForm, newValue, undefined)"
      v-bind="editCreditorFormMetaData.props"
    ></component>

      <component
        v-if="addCreditScoreDialog"
        :is="updateCreditScoreFFormMetaData.componentName"
        :ref="updateCreditScoreFFormMetaData.myRefName"
        :value="selectModel(updateCreditScoreForm, undefined)"
        @input="
          (newValue) => updateModel(updateCreditScoreForm, newValue, undefined)
        "
        v-bind="updateCreditScoreFFormMetaData.props"
      ></component>

      <component
        :is="creditorListFDataTableMetaData.componentName"
        :ref="creditorListFDataTableMetaData.myRefName"
        v-bind="creditorListFDataTableMetaData.props"
        :value="fiCreditorList"
      ></component>


      <v-card class="my-4" flat>
        <component
          :is="fClientCreditorListMetaData.componentName"
          :ref="fClientCreditorListMetaData.myRefName"
          v-bind="fClientCreditorListMetaData.props"
        ></component>
      </v-card>
     
      <!--ACTION START-->
      <div
        class="
          d-flex
          flex-row
          align-start
          flex-wrap
          justify-space-around
          pa-2
          my-5
        "
        v-if="!disabled"
      >
        <component
          v-for="(actionMetaData, index) of actionMetaDataListFiltered"
          :key="'action' + index"
          :is="actionMetaData.componentName"
          :ref="actionMetaData.myRefName"
          v-bind="actionMetaData.props"
        ></component>
      </div>
      <!--ACTION END-->
    </v-col>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import store, * as Store from "@/../src-gen/store";
import FBtn from "@/components/generic/FBtn.vue";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import AdminCreditorListFDataTableMDP from "./AdminCreditorListFDataTableMDP";
import FDataTable from "@/components/generic/table/FDataTable.vue";
import CFAUpdateCreditScoreFFormMDP from "./CFAUpdateCreditScoreFFormMDP";
import CFAAddCreditorFFormMDP from './CFAAddCreditorFFormMDP';
import CFAEditCreditorFFormMDP from './CFAEditCreditorFFormMDP';
import FSnackbar from "@/fsnackbar";
import FClientCreditorListMDP from "@/components/generic/file/clientCreditor/FClientCreditorListMDP";
import FClientCreditorList from "@/components/generic/file/clientCreditor/FClientCreditorList.vue";
@Component({
  components: {
    FForm,
    FBtn,
    FDataTable,
    FClientCreditorList
  },
})
export default class FAdminCreditor extends ModelVue {
  addCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  editCreditorForm: Data.Spine.Creditor = new Data.Spine.Creditor();
  settleCreditorInput: Data.ClientFile.SettleCreditorInput =
    new Data.ClientFile.SettleCreditorInput();
  updateCreditScoreForm: Data.ClientFile.UpdateCreditInfoInput =
    new Data.ClientFile.UpdateCreditInfoInput();
  selectedCreditorItem: Data.Spine.Creditor;
  @Store.Getter.ClientFile.ClientFileSummary.fileSummary
  clientFileSummary: Data.ClientFile.FileSummary;

  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileId = this.$route.params.clientFileId;

  addCreditScoreDialog = false;
  addCreditorDialog = false;
  editCreditorDialog = false;



  settleCreditorDialog = false;
  taskId = this.$route.params.taskId;

  @Prop()
  actionMetaDataList: any[];

  @Prop()
  disabled: boolean;

  @Prop()
  readonly: boolean;

  @Prop()
  taskRoot: any;

  showSettlePopup() {
    this.settleCreditorDialog = true;
  }

  closeAndClearAllForms() {
    this.closeDialogs();
    this.resetForms();
  }
  closeDialogs() {
    this.settleCreditorDialog = false;
    this.addCreditScoreDialog = false;
    this.addCreditorDialog = false;
    this.editCreditorDialog = false;
  }
  resetForms() {
    this.addCreditorForm = new Data.Spine.Creditor();
    this.editCreditorForm = new Data.Spine.Creditor();
  }

  showAddForm() {
    this.closeDialogs();
    this.addCreditorDialog = true;
  }


  showEditForm() {
    this.closeDialogs();
    this.editCreditorDialog = true;
  }



  selectEditCreditor(item: any) {
    this.selectedCreditorItem = item;
    this.editCreditorForm = {
      ...item,
    };
    this.showEditForm();
  }




  showAddCreditScoreForm() {
    this.closeDialogs();
    this.addCreditScoreDialog = true;
    this.updateCreditScoreForm.creditScore = this.clientFileBasicInfo.creditScore || 0;
    this.updateCreditScoreForm.creditBureau =
      this.clientFileBasicInfo.creditBureau || "";
  }

  get fiCreditorList() {
    return this.modelValue?.fiCreditorList;
  }

  get totalDebt() {
    return this.modelValue.totalDebt;
  }

  settleCreditorData(item: any) {
    this.settleCreditorInput.fiCreditorId = item.fiCreditorId;
    Action.ClientFile.SettleCreditor.execute(
      this.settleCreditorInput,
      (output) => {
        this.closeDialogs();
        this.getFiCreditorInfo();
        this.findClientFileSummary();
        FSnackbar.success("Succesfully Settled Creditor");
      },
      (err) => console.log(err)
    );
  }

  getFiCreditorInfo() {
    Action.ClientFile.GetCreditorInfo.execute1(
      this.clientFileId,
      (output) => {}
    );
  }
  findClientFileSummary() {
    Action.ClientFile.GetClientFileSummary.execute1(
      this.clientFileId,
      (output) => {}
    );
  }

  selectSettleCreditor(item: any) {
    this.selectedCreditorItem = item;
    this.showSettlePopup();
  }

  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }

  isClientFileLead(): boolean {
    return this.clientFileBasicInfo.clientFileStatus.id === 'LEAD'
  }
 isCreditCard(): boolean {
    if(this.addCreditorDialog) {
    return this.addCreditorForm.debtType === 'Credit Card'
    } else {
      return this.editCreditorForm.debtType === 'Credit Card'
    }
  }

  // META DATA
  get creditorListFDataTableMetaData() {
    return new AdminCreditorListFDataTableMDP({ parent: this }).getMetaData();
  }
  get updateCreditScoreFFormMetaData() {
    return new CFAUpdateCreditScoreFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }

  get addCreditorFormMetaData() {
    return new CFAAddCreditorFFormMDP({
      taskRoot: this,
      parent: this,
    }).getMetaData();
  }

   get editCreditorFormMetaData() {
    return new CFAEditCreditorFFormMDP({
       taskRoot: this.taskRoot,
      parent: this,
    }).getMetaData();
  }


 get fClientCreditorListMetaData() {
    return new FClientCreditorListMDP({
      parent: this,
      taskRoot: this.taskRoot
    }).getMetaData();
  }

  handleClientCreditorChange(item: any) {
    this.addCreditorForm = Data.Spine.Creditor.fromJson(item);
  }

    handleExcludeInProgram(item: any) {
    
    Action.ClientFile.ExcludeFiCreditorFromProgram.execute2(this.clientFileId,item.fiCreditorId, output => {

    });
  }


  // META DATA
}
</script>
