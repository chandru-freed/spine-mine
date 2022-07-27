<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-row class="align-center justify-center">
          <v-col xs="12" sm="8" md="4">
            <v-card outlined min-height="350px">
              <v-toolbar flat dark color="primary ">
                <v-toolbar-title>Sign In</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon color="secondary">
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="pa-10 pb-0">
                <!-- <SmileForm
              v-model='loginForm'
              :decorator='decorator'
              submit-text='Login'
              :cancel='false'
              @submit='login'>
              </SmileForm> -->

                <!-- <component
                  ref="loginFormRef"
                  key="loginForm"
                  :is="loginFormComp.componentName"
                  v-model="loginForm"
                  v-bind="loginFormComp.props"
                /> -->
                <!-- <f-form
                key="loginForm"
                ref="loginFormRef"
                name="Login Form"
                form-key="loginForm"
                :outlined="false"
                :form-class="false"
                :field-config-list="loginFormComp."
              ></f-form> -->
              </v-card-text>
              <v-card-actions class="px-12 pt-0 pb-6">
                <v-btn outlined color="secondary" block @click="login"
                  >Login</v-btn
                >
              </v-card-actions>
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
import * as RemoteApiPoint from "@/remote-api-point";


import axios, { AxiosError, AxiosInstance } from "axios";
@Component({
  components: {
   //  "f-form-1": FForm1,
  },
})
export default class Login extends Vue {
  loginForm: Data.Login.LoginForm = new Data.Login.LoginForm();
  loginFormComp = {}
  roleList = [];

  public requestLogin() {
    (this.$refs as any)["loginFormRef"].onSubmit(() => {
      console.log("Sumitted");
      this.login();
    });
  }

  public login() {
    const vm = this;
    console.log("-------login --------");
    console.log(RemoteApiPoint);
    console.log(RemoteApiPoint.GompaApi);

    Action.Login.Login.execute(
      this.loginForm,
      (output) => {
        vm.getRoleListForUser(this.loginForm.userName);
      },
      (err) => {
        console.error(err);
      },
      RemoteApiPoint.GompaApi
    );
  }

  getLoggedInUser(userName: string) {
    Action.Login.GetUserDetails.execute1(userName, (output) => "",
      (err) => {
        console.error(err);
      },
      RemoteApiPoint.GompaApi);
  }

  getRoleListForUser(userName: string) {
    const vm = this;
    console.log("-----getRoleListForUser ----");
    console.log(RemoteApiPoint.GompaApi);
    Action.Login.GetRoleListForUser.execute(
      new Data.Login.MyAppId(),
      (output) => {
        console.log(output);
        if (output.roleList.indexOf("USER") >= 0) {
          console.log("USER role present");
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
      },
      (err) => {
        console.error(err);
      },
      RemoteApiPoint.GompaApi
    );
  }
}
</script>

<style></style>
