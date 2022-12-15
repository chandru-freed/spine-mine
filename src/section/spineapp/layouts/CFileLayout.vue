
<template>
  <v-container fluid>
    <router-view name="leftNav" />
    <div class="ml-15">
      <div class="row no-gutters">
        <div class="col-12">
          <router-view name="summary" />
        </div>
      </div>
      <div class="row mt-0">
        <div class="col-9 pt-1">
          <router-view :key="$route.fullPath"></router-view>
        </div>
        <div class="col-3 pt-9">
          <router-view name="quickNav" />
          <!-- <v-card outlined height="1000px"></v-card> -->
        </div>
      </div>
    </div>

    <!-- <div :class="['phoneCall', showHide ? 'right0' : '']">
      <v-btn
        v-show="!hidden"
        color="green"
        dark
        v-bind="attrs"
        v-on="on"
        fab
        @click="openNavShow()"
      >
        <v-icon v-if="!showHide">mdi-phone-in-talk</v-icon>
        <v-icon v-if="showHide">mdi-close</v-icon>
      </v-btn>
    </div>

    <div :class="['sidenavBar', showHide ? 'right0' : '']">
      <AmeyoToolbarDialog />
    </div> -->
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import AmeyoToolbarDialog from "@/components/generic/ameyo/AmeyoToolbarDialog.vue";
import AmeyoService from "@/components/generic/ameyo/AmeyoService";
import FNumberTextField from "@/components/generic/form/field/FNumberTextField.vue";

@Component({
  components: {
    AmeyoToolbarDialog,
    FNumberTextField,
  },
})
export default class CFileLayout extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  clientFileId = this.$route.params.clientFileId;
  dialog: boolean = false;
  phoneNumber: string;
  showHide = false;

  mounted() {
    Store.Mutation.ClientFile.ClientFileSummary.RESET_C_F_SUMMARY();
    this.getCFBasicInfo();
    this.findClientFileSummary();
    this.getTaskListForClientFile();
    Action.TaskList.PullStartAndMerge.interested(this.getTaskListForClientFile);
  }

  get clientFileNumber(): string {
    return this.clientFileBasicInfo.clientFileNumber;
  }

  getTaskListForClientFile() {
    setTimeout(() => {
      Action.TaskList.GetTaskListByCid.execute1(
        this.clientFileNumber,
        (output) => {}
      );
    }, 1000);
  }

  getCFBasicInfo() {
    Action.ClientFile.GetCFBasicInfo.execute1(
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

  private callEndAmeyo() {
    AmeyoService.disposeCallByDisposition();
  }

  callByAmeyo() {
    console.log(this.phoneNumber);
    AmeyoService.dial(this.phoneNumber);
  }

  openNavShow() {
    this.showHide = !this.showHide;
  }
}
</script>

<style scoped>
.sidenavBar {
  position: fixed;
  top: 0;
  right: -500px;
  bottom: 0;
  z-index: 999;
  background: #fff;
  transition: 0.5s;
}
.sidenavBar.right0 {
  right: 0;
}
.phoneCall {
  position: fixed;
  bottom: 15px;
  right: 10px;
  transition: 0.5s;
}
.phoneCall.right0 {
  right: 330px;
}
</style>

