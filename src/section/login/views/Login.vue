<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-row class="align-center justify-center">
          <v-col xs="12" sm="8" md="4">
            <v-card flat outlined>
              <v-toolbar color="primary" flat dark>
                <v-avatar size="40px">
                  <v-icon>mdi-account-circle-outline</v-icon>
                </v-avatar>
                <v-toolbar-title>Sign In</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-list-item-avatar>
                  <v-img src="@/assets/freed-small-logo.svg" />
                </v-list-item-avatar>
              </v-toolbar>
              <v-card-text>
                <component
                  v-if="!!loginFormMetaData"
                  :ref="loginFormMetaData.myRefName"
                  :is="loginFormMetaData.componentName"
                  v-model="loginForm"
                  v-bind="loginFormMetaData.props"
                ></component>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
// import SmileForm from "@/section/core/components/smile/SmileForm.vue"; // '@/section/core/components/smile/SmileForm.vue';
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
// import FForm1 from "@/components/FForm1.vue";

import FForm from "@/components/generic/form/FForm.vue";
import LoginFFormMDP from "./LoginFFormMDP";
import AmeyoService from "@/components/generic/ameyo/AmeyoService";

import axios, { AxiosError, AxiosInstance } from "axios";
@Component({
  components: {
    LoginFFormMDP,
    FForm,
  },
})
export default class Login extends Vue {
  loginForm: Data.Login.LoginForm = new Data.Login.LoginForm();

  roleList = [];

  get loginFormMetaData(): any {
    return new LoginFFormMDP({ taskRoot: this, parent: this }).getMetaData();
  }

  public login() {
    const vm = this;

    Action.Login.Login.execute(this.loginForm, (output) => {
      vm.getRoleListForUser(this.loginForm.userName);
      setTimeout(() => {
        this.ameyoLogin(this.loginForm.userName, this.loginForm.password);
      }, 3000);
      
    });
  }

  getLoggedInUser(userName: string) {
    Action.Login.GetUserDetails.execute1(userName, (output) => {});
  }

  getRoleListForUser(userName: string) {
    const vm = this;
    Action.Login.GetRoleListForUser.execute(
      new Data.Login.MyAppId(),
      (output) => {
        if (output.roleList.indexOf("USER") >= 0) {
          window.localStorage.setItem("userName", this.loginForm.userName);
          vm.getLoggedInUser(this.loginForm.userName);
          if (this.$route.query.redirect) {
            const redirect: any = vm.$route.query.redirect;
            this.$router.push({ path: redirect });
          } else {
            this.$router.push({ name: "Root.Home" });
          }
        } else {
          window.localStorage.removeItem("userName");
          // Snackbar.show({
          //   text: 'Not Authorized.',
          //   pos: 'bottom-center'
          // });
        }
      }
    );
  }
  private ameyoLogin(userId: string, password: string) {
    console.log("AmeyoService", userId, password);
    AmeyoService.login(userId, password);
  }
}
</script>

<style></style>
