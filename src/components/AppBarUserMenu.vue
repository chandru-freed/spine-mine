<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
      <!-- <v-badge
        top
        color="secondary"
        overlap
        offset-x="14"
        offset-y="14"
        class="ms-4"
        dot
      > -->
      <v-avatar size="40px" v-bind="attrs" v-on="on">
        <!-- <v-img :src="require('@/assets/images/avatars/1.png')"></v-img> -->
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-avatar>
      <!-- </v-badge> -->
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-badge
          bottom
          color="success"
          overlap
          offset-x="12"
          offset-y="12"
          class="ms-4"
          dot
        >
          <v-avatar size="40px">
            <!-- <v-img :src="require('@/assets/images/avatars/1.png')"></v-img> -->
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
        </v-badge>
        <div
          class="d-inline-flex flex-column justify-center ms-3"
          style="vertical-align: middle"
        >
          <span class="text--primary font-weight-semibold mb-n1">
            {{ loggedInUser.userName }}
            <!-- John Doe -->
          </span>
          <small class="text--disabled text-capitalize">
            {{ loggedInUser.fullName }}</small
          >
        </div>
      </div>

      <!-- <v-divider></v-divider> -->

      <v-list-item @click="goto('Root.User.ChangePassword')" link>
        <v-list-item-icon class="me-2">
          <v-icon small> mdi-key-outline </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Change Password</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Profile -->
      <!-- <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
             mdi-account-outline 
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Email -->
      <!-- <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-email-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Inbox</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Chat -->
      <!-- <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-email-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Chat</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-badge
            inline
            color="error"
            content="2"
          >
          </v-badge>
        </v-list-item-action>
      </v-list-item> -->

      <!-- <v-divider class="my-2"></v-divider> -->

      <!-- Settings -->
      <!-- <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-cog-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Pricing -->
      <!-- <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-currency-usd
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Pricing</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- FAQ -->
      <!-- <v-list-item link>
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            mdi-help-circle-outline 
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>FAQ</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-divider class="my-2"></v-divider>

      <!-- Logout -->
      <v-list-item @click="logout" dense>
        <v-list-item-icon class="me-2">
          <v-icon size="22"> mdi-logout-variant </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as Action from "@/../src-gen/action";
import AmeyoService from "./generic/ameyo/AmeyoService";
@Component
export default class AppBarUserMenu extends Vue {
  @Store.Getter.Login.LoginDetails.loggedInUser
  loggedInUser: Data.Login.LoginDetails;

  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[];

  logout() {
     try {
         AmeyoService.logout();
     } catch {
      //  console.error('Something went wrong')
    }

    setTimeout(() => {
        window.localStorage.removeItem("userName");
        this.$router.push({ name: "Login.Login" });
      }, 2000); 
     
     
  }

  goto(routerName: string) {
    this.$router.push({ name: routerName });
  }

  private logoutByAmeyo() {
    // AmeyoService.logout();
  }
}
</script>
