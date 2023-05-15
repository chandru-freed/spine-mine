<template>
  <div class="col">
    <v-alert color="warning" outlined>
      <div class="col text-center">
        <div class="text-center">
          Hardship check failed.This is because of the funds available with the
          client are either positive, zero or negative(Upto -5%).
          <div class="text-center">Take exception before continuing.</div>
        </div>
        <!-- <v-textarea outlined dense rows="2" label="notes"></v-textarea> -->
        <div class="d-flex justify-center">
          <!-- <f-btn label="Take Exception" outlined primary color="warning" :onClick="() => updateExceptionTaken()"/> -->

          <component
            v-if="!!budgetExceptionFFormMetaData"
            :ref="budgetExceptionFFormMetaData.myRefName"
            :is="budgetExceptionFFormMetaData.componentName"
            :value="selectModel(addNoteInput, undefined)"
            @input="
              (newValue) => updateModel(addNoteInput, newValue, undefined)
            "
            v-bind="budgetExceptionFFormMetaData.props"
          ></component>
        </div>
      </div>
    </v-alert>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import store, * as Store from "@/../src-gen/store";
import BudgetExceptionFFormMDP from "./BudgetExceptionFFormMDP";
import FSnackbar from "@/fsnackbar";

@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class BudgetException extends ModelVue {
  @Prop()
  taskRoot: any;

  addNoteInput: Data.FiNote.AddNoteInput = new Data.FiNote.AddNoteInput();
  clientFileId = this.$route.params.clientFileId;

  updateExceptionTaken() {
    const input = new Data.ClientFile.UpdateExceptionTakenListInput();
    this.addNoteInput.clientFileId = this.clientFileId;
    input.clientFileId = this.clientFileId;
    input.exceptionTakenList = this.modelValue.taskOutput.exceptionTakenList;

    const noIndex = input.exceptionTakenList.indexOf("NO");
    if (noIndex !== -1) {
      input.exceptionTakenList.splice(noIndex, 1);
    }

    
    input.exceptionTakenList.push(Data.ClientFile.EXCEPTION_TAKEN.HARDSHIP.id);
    console.log(this.taskRoot.taskFormData.taskOutput.budgetInfo,"Budget info")
    Store.Mutation.ClientFile.ClientFileSummary.UPDATE_BUDGET_INFO(this.modelValue.taskOutput.budgetInfo)

    // input.exceptionTakenList.push(Data.ClientFile.EXCEPTION_TAKEN.)
    input.exceptionApprovedBy = this.modelValue.taskOutput.exceptionApprovedBy;
    Action.ClientFile.UpdateExceptionTakenList.execute(input, (output) => {
      Action.FiNote.AddNote.execute(this.addNoteInput, (output) => {
        FSnackbar.success("Successfully taken the exception");
      });
    });
  }

  get budgetExceptionFFormMetaData() {
    return new BudgetExceptionFFormMDP({
      parent: this,
      taskRoot: this.taskRoot,
    }).getMetaData();
  }
}
</script>