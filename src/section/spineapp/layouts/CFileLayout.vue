
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
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

@Component
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
     setTimeout(() => {
      this.getTaskListForClientFile();
    }, 1000);

    Action.TaskList.PullStartAndMerge.interested(
      this.getTaskListForClientFileHandler
    );
    Action.ClientFile.CheckAndUpdateEMandate.interested(
      this.getTaskListForClientFileHandler
    );
  }
  public destroyed() {
    Action.TaskList.PullStartAndMerge.notInterested(
      this.getTaskListForClientFileHandler
    );

    Action.ClientFile.CheckAndUpdateEMandate.notInterested(
      this.getTaskListForClientFileHandler
    );
  }

  checkProgramCodeAndNavigate() {
    console.log(this.$route.name,"Name");

    if(this.clientFileBasicInfo.programCode === 'DCP') {
      const routeStringList: any[] = this.$route.name?.split('.') || [];
       const dcpRoute = routeStringList.map(item => {
        const routeText = item !=='Root'?'DCP'+item:item;
        return routeText;
       }).join('.')
       this.$router.replace({name:dcpRoute,params: { clientFileId: this.clientFileBasicInfo.clientFileId },})
       
    }
  }

  get clientFileNumber(): string {
    return this.clientFileBasicInfo.clientFileNumber;
  }

  getTaskListForClientFileHandler = (output: any) => {
    setTimeout(() => {
      this.getTaskListForClientFile();
    }, 1000);
  };

  getTaskListForClientFile() {
    Action.TaskList.GetTaskListByCid.execute1(
      this.clientFileNumber,
      (output) => {}
    );
  }

  getCFBasicInfo() {
    Action.ClientFile.GetCFBasicInfo.execute1(
      this.clientFileId,
      (output) => {
        this.checkProgramCodeAndNavigate();
      }
    );
  }

  findClientFileSummary() {
    Action.ClientFile.GetClientFileSummary.execute1(
      this.clientFileId,
      (output) => {}
    );
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
  z-index: 9999;
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

